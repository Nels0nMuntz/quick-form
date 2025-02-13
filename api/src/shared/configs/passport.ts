import { Request } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import bcrypt from "bcrypt";
import { db } from "../../lib";
import { NotAuthorizedError } from "../../utils";

const cookieExtractor = (req: Request) => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies["jwt_access"];
  }
  return jwt;
};

export const registerPassportStrategies = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await db.user.findUnique({ where: { email } });
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          //   if (!user.isVerified) {
          //     return done(null, false, { message: "Email not verified." });
          //   }
          const isMatch = await bcrypt.compare(password, user.password_hash);
          if (!isMatch) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_ACCESS_SECRET || "",
      },
      async (jwt_payload, done) => {
        try {
          const { id, exp } = jwt_payload;
          if (Date.now() >= exp * 1000) {
            return done(new NotAuthorizedError(), false);
          }

          const user = await db.user.findUnique({
            where: { id },
          });
          if (user) {
            return done(null, user);
          } else {
            console.log("no user");
            return done(new NotAuthorizedError(), false);
          }
        } catch (error) {
          console.log("catch error");
          return done(new NotAuthorizedError(), false);
        }
      }
    )
  );
};
