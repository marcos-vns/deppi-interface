import Image from "next/image";
import { AppLogo } from "@/components/app-logo";

export function LoginIntroduction() {
  return (
    <section
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#354333] px-[clamp(32px,5vw,76px)] py-[40px] text-white max-md:min-h-[300px] max-md:px-[26px] max-md:py-[25px]"
      aria-label="Cursos de extensão do IFCE"
    >
      <Image
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        src="/ifce.jpeg"
        alt="Campus do Instituto Federal do Ceará"
        fill
        priority
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/5 to-black/75 max-md:bg-gradient-to-r max-md:from-black/75 max-md:to-black/30" />

      <AppLogo />

      <div className="mt-auto mb-[42px] max-w-[510px] max-md:mt-[64px] max-md:mb-0">
        <h1 className="m-0 max-w-[510px] text-[clamp(36px,4vw,58px)] leading-[1.08] font-semibold tracking-[-.045em] max-md:max-w-[420px] max-md:text-[clamp(32px,8vw,44px)]">
          Cursos de extensão do IFCE, num só lugar.
        </h1>
        <p className="mt-[18px] mb-0 max-w-[390px] text-[15px] leading-[1.65] text-white/85 max-md:hidden">
          Inscreva-se, envie seus documentos e acompanhe a análise da sua inscrição.
        </p>
      </div>
    </section>
  );
}
