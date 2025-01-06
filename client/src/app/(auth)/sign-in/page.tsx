import { Metadata } from "next";

import { SignInPage } from "@/views/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function SignIn() {
  return <SignInPage />;
}
