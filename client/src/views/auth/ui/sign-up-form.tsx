"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { EyeIcon, EyeOff } from "lucide-react";
import {
  signUpFormSchema,
  SignUpFormValues,
} from "../models/schemas/signup-form-schema";

export function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = (values: SignUpFormValues) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col gap-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@mail.com" {...field} />
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
                <FormLabel>Password</FormLabel>
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
          <Button className="font-bold text-lg p-3" type="submit">
            Create Account
          </Button>
        </form>
      </Form>
      <div className="flex justify-center">
        <div className="px-5 bg-white relative">Already have an Account?</div>
      </div>
      <Button variant="outline" className="font-bold text-lg p-3" type="button">
        <Link href="/sign-in">Login</Link>
      </Button>
    </div>
  );
}
