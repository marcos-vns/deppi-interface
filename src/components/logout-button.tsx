"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    window.localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <button
      className="inline-flex w-fit items-center gap-2 text-sm font-medium text-red-700 underline underline-offset-4 transition-colors hover:text-red-800"
      type="button"
      onClick={handleLogout}
    >
      <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
      Sair
    </button>
  );
}
