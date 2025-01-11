import { Metadata } from "next";

import { SignUpPage } from "@/views/sign-up";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to get started.",
};

export default function SignUp() {
  return <SignUpPage />;
}
