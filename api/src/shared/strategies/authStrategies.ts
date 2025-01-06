import passport from "passport";

export const authStrategies = {
  credentials: passport.authenticate("local", { session: false }),
  jwt: passport.authenticate("jwt", { session: false, failWithError: true }),
};
