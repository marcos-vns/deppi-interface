"use client";

import { useState, type SubmitEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post<{ token?: string }>(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"}/auth/login`,
        {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      );

      if (!response.data.token) {
        setErrorMessage("A resposta da API não contém um token de autenticação.");
        return;
      }

      window.localStorage.setItem("token", response.data.token);
      router.push("/home");
    } catch (error) {
      const apiMessage = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      setErrorMessage(
        apiMessage ?? "Não foi possível entrar. Verifique seus dados e tente novamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="flex min-h-svh flex-col items-center justify-center px-[clamp(32px,7vw,112px)] pt-16 pb-6 max-md:min-h-0 max-md:px-[26px] max-md:pt-12 max-md:pb-[22px]"
      aria-labelledby="login-heading"
    >
      <div className="my-auto w-full max-w-[420px] max-md:my-0">
        <div className="mb-[34px]">
          <h2 className="m-0 text-[32px] leading-[1.2] font-semibold tracking-[-.035em] text-[#18211d]" id="login-heading">Entrar</h2>
          <p className="mt-[9px] mb-0 text-sm leading-[1.5] text-[#727671]">Use seu e-mail institucional.</p>
        </div>

        <form className="flex flex-col gap-[21px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label className="text-[13px] font-medium text-[#2b302c]" htmlFor="email">
              E-mail institucional
            </Label>
            <div className="relative flex items-center">
              <Mail
                className="pointer-events-none absolute left-3.5 text-[#868b85]"
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <Input
                className="h-12 rounded-lg border-[#e3e1dc] bg-white pl-10 text-sm text-[#20241f] shadow-none placeholder:font-normal placeholder:text-[#a4a6a1] focus-visible:border-primary focus-visible:ring-primary/20"
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[13px] font-medium text-[#2b302c]" htmlFor="password">
              Senha
            </Label>
            <div className="relative flex items-center">
              <LockKeyhole
                className="pointer-events-none absolute left-3.5 text-[#868b85]"
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <Input
                className="h-12 rounded-lg border-[#e3e1dc] bg-white pl-10 text-sm text-[#20241f] shadow-none placeholder:font-normal placeholder:text-[#a4a6a1] focus-visible:border-primary focus-visible:ring-primary/20"
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <Button className="mt-[3px] min-h-12 cursor-pointer rounded-lg border-0 bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          {errorMessage && (
            <Alert className="-mt-3 border-red-200 bg-red-50 text-red-800" variant="destructive">
              <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
            </Alert>
          )}
        </form>

        <div className="my-[27px] mb-[22px] flex items-center gap-[14px] text-xs text-[#92958f]">
          <Separator className="flex-1" />
          <span>ou</span>
          <Separator className="flex-1" />
        </div>
        <p className="m-0 text-center text-[13px] text-[#727671]">
          Ainda não tem conta?{" "}
          <Button asChild className="h-auto p-0 font-semibold" variant="link">
            <Link href="#criar-conta">Crie sua conta</Link>
          </Button>
        </p>
      </div>
    </section>
  );
}
