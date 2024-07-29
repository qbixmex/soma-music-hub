import { Metadata } from "next";
import RegisterForm from "./(components)/form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quantic Coders - Register",
  description: "Register Page",
  robots: "noindex, nofollow",
};

const RegisterPage = () => {
  return (
    <RegisterForm />
  );
};

export default RegisterPage;
