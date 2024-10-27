"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";
import clsx from "clsx";

import loginSchema from "./login-schema";
import { authenticate } from "@/actions";

const LoginForm = () => {
  const [ isPending, setIsPending ] = useState(false);
  const [ isPasswordVisible, setPasswordIsVisible ] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsPending(true);

    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    const response = await authenticate(formData);

    setIsPending(false);

    if (response === 'Invalid credentials !') {
      toast.error(response, {
        duration: 3000,
        position: "top-right",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // FULL REFRESH to get the new token
    window.location.href = "/admin/dashboard";

  };

  const handleVisibly = () => {
    return setPasswordIsVisible(prev => !prev);
  };

  return (
    <div className="container h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 w-full">

        <h1 className="text-5xl font-bold text-center">Login</h1>

        <div className="w-full sm:max-w-sm mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-[100%] sm:max-w-sm pt-6">
                <CardContent>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-1.5">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={(isPasswordVisible) ? "text" : "password"}
                              autoComplete="off"
                              {...field}
                            />
                            {(isPasswordVisible)
                              ? <IoEye onClick={handleVisibly} className="absolute top-0 right-3 bottom-0 m-auto cursor-pointer" />
                              : <IoEyeOff onClick={handleVisibly} className="absolute top-0 right-3 bottom-0 m-auto cursor-pointer" />
                            }
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-start md:justify-end">
                  <Button
                    type="submit"
                    variant={isPending ? "secondary" : "primary"}
                    className={clsx("w-full md:w-fit", {
                      "cursor-not-allowed": isPending,
                    })}
                    disabled={ isPending }
                  >
                    {isPending
                      ? (
                        <span className="flex items-center gap-2">
                          <Spinner />
                          <span className="animate-pulse">wait ...</span>
                        </span>
                      ) : 'Sign In'
                    }
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>

          {/* <div>
            <p className="flex items-center justify-center gap-3 mt-5">
              <span>Don&apos;t have an account?</span>
              <Link href="/auth/register" className="text-blue-400 hover:underline">Register</Link>
            </p>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default LoginForm;