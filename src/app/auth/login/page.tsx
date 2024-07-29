import { Metadata } from "next";
import LoginForm from "./(components)/form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
  robots: "noindex, nofollow",
};

const LoginPage = () => {
  return (
    <LoginForm />
  );
};

export default LoginPage;
