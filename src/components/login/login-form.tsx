"use client";

import { useState, type SubmitEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
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
          <label className="flex flex-col gap-2 text-[13px] font-medium text-[#2b302c]" htmlFor="email">
            <span>E-mail institucional</span>
            <span className="flex min-h-12 items-center gap-[11px] rounded-lg border border-[#e3e1dc] bg-white px-[14px] text-[#868b85] transition-[border-color,box-shadow] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgb(47_158_65_/_12%)]">
              <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
              <Input className="w-full min-w-0 border-0 bg-transparent text-sm text-[#20241f] outline-none placeholder:font-normal placeholder:text-[#a4a6a1]" id="email" name="email" type="email" placeholder="Digite seu email" autoComplete="email" />
            </span>
          </label>

          <label className="flex flex-col gap-2 text-[13px] font-medium text-[#2b302c]" htmlFor="password">
            <span>Senha</span>
            <span className="flex min-h-12 items-center gap-[11px] rounded-lg border border-[#e3e1dc] bg-white px-[14px] text-[#868b85] transition-[border-color,box-shadow] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgb(47_158_65_/_12%)]">
              <LockKeyhole size={18} strokeWidth={1.8} aria-hidden="true" />
              <Input className="w-full min-w-0 border-0 bg-transparent text-sm text-[#20241f] outline-none placeholder:font-normal placeholder:text-[#a4a6a1]" id="password" name="password" type="password" placeholder="Digite sua senha" autoComplete="current-password" />
            </span>
          </label>

          <Button className="mt-[3px] min-h-12 cursor-pointer rounded-lg border-0 bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
          <p className="-mt-3 min-h-5 text-sm text-red-700" role="alert" aria-live="polite">
            {errorMessage}
          </p>
          {successMessage && (
            <p className="-mt-5 text-sm text-primary" role="status" aria-live="polite">
              {successMessage}
            </p>
          )}
        </form>

        <div className="my-[27px] mb-[22px] flex items-center gap-[14px] text-xs text-[#92958f] before:h-px before:flex-1 before:bg-[#e6e3de] before:content-[''] after:h-px after:flex-1 after:bg-[#e6e3de] after:content-['']"><span>ou</span></div>
        <p className="m-0 text-center text-[13px] text-[#727671]">Ainda não tem conta? <Link className="font-semibold text-primary no-underline hover:underline hover:underline-offset-[3px]" href="#criar-conta">Crie sua conta</Link></p>
      </div>
    </section>
  );
}
