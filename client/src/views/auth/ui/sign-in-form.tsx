"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOff } from "lucide-react";

import {
  signInFormSchema,
  SignInFormValues,
} from "../models/schemas/signin-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseButton,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { useSignin } from "../api/useSignin";

export function SignInForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { submit, isLoading } = useSignin();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const signin = (values: SignInFormValues) => submit(values);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signin)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@mail.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  <span>Password</span>
                  <Link href="/forgot-password" className="text-sky">
                    Forgot password?
                  </Link>
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <BaseButton
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </BaseButton>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="font-bold text-lg p-3"
            type="submit"
            loading={isLoading}
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-px before:bg-midnight/40 flex justify-center">
        <div className="px-5 bg-white relative">or</div>
      </div>
      <Button variant="outline" className="font-bold text-lg p-3" type="button">
        <Link href="/sign-up">Create Account</Link>
      </Button>
    </>
  );
}
