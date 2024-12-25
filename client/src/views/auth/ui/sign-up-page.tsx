import { SignUpForm } from "./sign-up-form";

export function SignUpPage() {
  return (
    <div className="w-full max-w-[280px] flex flex-col gap-y-6">
      <h1 className="text-2xl font-medium">Create Account</h1>
      <SignUpForm />
    </div>
  );
}
