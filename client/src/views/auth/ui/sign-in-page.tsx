import { SignInForm } from "./sign-in-form";

export function SignInPage() {
  return (
    <div className="w-full max-w-[280px] flex flex-col gap-y-6">
      <h1 className="text-2xl font-medium">Login</h1>
      <SignInForm />
    </div>
  );
}
