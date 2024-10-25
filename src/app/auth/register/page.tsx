import { Metadata } from "next";
import RegisterForm from "./(components)/form";

export const metadata: Metadata = {
  title: "Register",
  description: "Register Page",
  robots: "noindex, nofollow",
};

const RegisterPage = () => {
  return (
    <RegisterForm />
  );
};

export default RegisterPage;
