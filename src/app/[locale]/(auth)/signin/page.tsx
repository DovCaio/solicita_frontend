import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Solicita",
  description: "Esssa é a página de login do solicita",
};

export default function SignIn() {
  return <SignInForm />;
}
