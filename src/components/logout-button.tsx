"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    window.localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-token-change"));
    router.replace("/login");
  }

  return (
    <Button
      className="h-auto w-fit gap-2 rounded-none p-0 text-sm font-medium text-destructive underline underline-offset-4 transition-colors hover:bg-transparent hover:text-destructive/80"
      variant="ghost"
      type="button"
      onClick={handleLogout}
    >
      <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
      Sair
    </Button>
  );
}
