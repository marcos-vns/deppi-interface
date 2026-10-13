"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { Forbidden } from "@/components/forbidden";

type Access = "allowed" | "forbidden";

function subscribeToTokenChanges(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("auth-token-change", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("auth-token-change", onChange);
  };
}

function getAccessSnapshot(): Access {
  return window.localStorage.getItem("token") ? "allowed" : "forbidden";
}

function getServerAccessSnapshot(): Access {
  return "forbidden";
}

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const access = useSyncExternalStore(
    subscribeToTokenChanges,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );
  const pathname = usePathname();
  const title = pathname === "/institutions" ? "Instituições" : "Início";

  if (access === "forbidden") return <Forbidden />;

  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar">
      <AppSidebar />
      <div className="relative flex w-full flex-1 flex-col bg-background">
        <AppHeader title={title} />
        {children}
      </div>
    </div>
  );
}
