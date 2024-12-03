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
import { useRouter } from "next/navigation";

const formScheme = z.object({
  email: z
    .string()
    .min(5, "Email minimal 5 characters")
    .max(255, "Email maximal 255 characters"),
  password: z.string().min(8, "Password minimal 8 characters"),
});

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof formScheme>> = async ({
    email,
    password,
  }) => {
    const api = new ApiHelper();
    setIsLoading(true);
    const res = await api.login(email, password);
    if (res.error) {
      toast({
        title: "Error while login",
        description: res.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: "Success!",
      description: "Welome back.",
    });
    router.push("/");
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
                  <CardTitle className="text-white">Sign In</CardTitle>
                  <CardDescription className="text-slate-200">
                    Welcome back to our app.
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
                </CardContent>
                <CardFooter className="flex flex-col gap-1">
                  <Button className="w-full rounded-full bg-transparent border border-white text-white hover:text-black font-semibold hover:bg-white">
                    Submit
                  </Button>
                  <p className="text-center font-semibold">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="hover:underline hover:text-green-400"
                    >
                      Sign Up
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

export default SignIn;
