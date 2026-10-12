"use client";

import { useEffect, useState } from "react";
import { AppLogo } from "@/components/app-logo";
import { Forbidden } from "@/components/forbidden";
import { LogoutButton } from "@/components/logout-button";

function hasValidToken(token: string | null): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) return false;

  try {
    const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = payloadBase64.padEnd(Math.ceil(payloadBase64.length / 4) * 4, "=");
    const binaryPayload = atob(paddedPayload);
    const payloadBytes = Uint8Array.from(binaryPayload, (character) => character.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as { exp?: unknown };

    return typeof payload.exp !== "number" || payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export default function HomePage() {
  const [access, setAccess] = useState<"checking" | "allowed" | "forbidden">("checking");

  useEffect(() => {
    if (hasValidToken(window.localStorage.getItem("token"))) {
      setAccess("allowed");
    } else {
      setAccess("forbidden");
    }
  }, []);

  if (access === "checking") {
    return <main className="min-h-svh bg-background" aria-label="Verificando autenticação" />;
  }

  if (access === "forbidden") return <Forbidden />;

  return (
    <main className="flex min-h-svh bg-background">
      <aside className="flex min-h-svh w-[260px] shrink-0 flex-col bg-sidebar-background px-6 py-7 text-[#18211d] max-sm:w-[220px] max-sm:px-4">
        <AppLogo />
        <div className="mt-auto flex justify-end">
          <LogoutButton />
        </div>
      </aside>
      <section className="flex-1 px-10 py-9 max-sm:px-6" aria-labelledby="home-heading">
        <h1 className="m-0 text-2xl font-semibold tracking-[-.03em] text-[#18211d]" id="home-heading">
          Início
        </h1>
      </section>
    </main>
  );
}
