"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custom-input";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ApiHelper } from "@/lib/api-helper";
import { useToast } from "@/hooks/use-toast";

const formScheme = z.object({
  email: z
    .string()
    .min(5, "Email minimal 5 characters")
    .max(255, "Email maximal 255 characters"),
  username: z
    .string()
    .min(5, "Username 5 characters")
    .max(255, "Username maximal 255 characters"),
  password: z.string().min(8, "Password minimal 8 characters"),
  confirmPassword: z.string(),
});

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof formScheme>> = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        message: "Please Confirm You're Password.",
      });
      return;
    }
    setIsLoading(true);
    const api = new ApiHelper();
    const res = await api.register(email, username, password);
    if (res.error) {
      toast({
        title: "Error while sign up",
        description: res.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: "Success!",
      description: "Check you're email, we sent verification!",
    });
    form.setValue("email", "");
    form.setValue("username", "");
    form.setValue("password", "");
    form.setValue("confirmPassword", "");
    setIsLoading(false);
  };
  return (
    <div className="bg-background-gradient px-4 min-h-screen flex justify-center items-center">
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="w-full lg:w-1/2"
        >
          <Card
            className={`bg-transparent bg-opacity-40 backdrop-filter backdrop-blur-xl dark:bg-opacity-40 relative ${
              isLoading && "pointer-events-none"
            }`}
          >
            {isLoading && (
              <div className="absolute rounded-lg flex justify-center items-center w-full h-full bg-slate-200 bg-opacity-40 backdrop-blur-2xl backdrop-filter">
                <div className="loader"></div>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle className="text-white">Sign Up</CardTitle>
                  <CardDescription className="text-slate-200">
                    Create Account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            placeholder="Email..."
                            type="email"
                            error={formState.errors.email}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            placeholder="Username..."
                            type="text"
                            error={formState.errors.username}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            placeholder="Password..."
                            type="password"
                            error={formState.errors.password}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            placeholder="Confirm Password..."
                            type="password"
                            error={formState.errors.confirmPassword}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-1">
                  <Button className="w-full rounded-full bg-transparent border border-white text-white hover:text-black font-semibold hover:bg-white">
                    Submit
                  </Button>
                  <p className="text-center font-semibold">
                    Have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="hover:underline hover:text-green-400"
                    >
                      Sign In
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignUp;
