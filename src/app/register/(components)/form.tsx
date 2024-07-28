"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "./register-schema";
import { z } from "zod";
import Link from "next/link";

const RegisterForm = () => {

  const [isPasswordVisible, setPasswordIsVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmIsVisible] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);

    console.log("Name:", formData.get('name'));
    console.log("Email:", formData.get('email'));
    console.log("Password:", formData.get('password'));

    // TODO Action Should be called here

    // if (!response.ok) {
    //   toast.error(response.message, {
    //     duration: 3000,
    //     position: "top-right",
    //     className: "bg-red-500 text-white",
    //   });
    // }

    // if (response.ok) {
    //   toast.success(response.message, {
    //     duration: 3000,
    //     position: "top-right",
    //     className: "bg-green-500 text-white",
    //   });
    // }
  };

  const handlePasswordVisibly = () => {
    return setPasswordIsVisible(prev => !prev);
  };

  const handlePasswordConfirmVisibly = () => {
    return setPasswordConfirmIsVisible(prev => !prev);
  };

  return (
    <div className="container h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5 w-full">

        <h1 className="text-5xl font-bold text-center">Register</h1>

        <div className="w-full sm:max-w-sm mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-[100%] sm:max-w-sm pt-6">
                <CardContent>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              ? <IoEye onClick={handlePasswordVisibly} className="absolute top-0 right-3 bottom-0 m-auto cursor-pointer" />
                              : <IoEyeOff onClick={handlePasswordVisibly} className="absolute top-0 right-3 bottom-0 m-auto cursor-pointer" />
                            }
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                      <FormItem className="mb-1.5">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={(isPasswordConfirmVisible) ? "text" : "password"}
                              autoComplete="off"
                              {...field}
                            />
                            {(isPasswordVisible)
                              ? <IoEye onClick={handlePasswordConfirmVisibly} className="absolute top-0 right-3 bottom-0 m-auto cursor-pointer" />
                              : <IoEyeOff onClick={handlePasswordConfirmVisibly} className="absolute top-0 right-3 bottom-0 m-auto cursor-pointer" />
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
                    variant="outline"
                    className="w-full md:w-fit"
                  >Sign Up</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>

          <div>
            <p className="flex justify-center gap-3 mt-5">
              <span>Do you have an account ?</span>
              <Link href="/login" className="text-blue-400 hover:underline">Sign In</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterForm;