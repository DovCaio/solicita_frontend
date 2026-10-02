"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { api } from "@/lib/api";
import { useState } from "react";
import Alert from "../ui/alert/Alert";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements as any;
    api
      .post("/auth/login", {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError(
          error.response?.data?.message ||
            "Falha ao fazer login. Por favor, tente novamente.",
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto mb-5 w-full max-w-md sm:pt-10"></div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-title-sm font-semibold text-gray-800 sm:text-title-md dark:text-white/90">
              Logar
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entre com seu username e senha
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="Insira seu username"
                    id="username"
                    name="username"
                  />
                </div>
                <div>
                  <Label>
                    Senha <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Insira sua senha"
                      id="password"
                      name="password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-e-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Button className="w-full" size="sm">
                    Logar
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5"></div>
          </div>
        </div>
      </div>
      {error && (
        <div className="absolute right-1 bottom-1 max-w-1/5">
          <Alert title="Error No Login" variant="error" message={error} />
        </div>
      )}
    </div>
  );
}
