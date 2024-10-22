import { Metadata } from "next";
import RegisterForm from "./(components)/form";

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
