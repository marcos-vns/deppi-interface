"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home } from "lucide-react";
import { AppLogo } from "@/components/app-logo";
import { LogoutButton } from "@/components/logout-button";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="px-6 py-7">
        <AppLogo />
      </div>
      <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-1 p-2">
          <li>
            <Link
              href="/home"
              aria-current={pathname === "/home" ? "page" : undefined}
              className={`flex w-full items-center gap-2 rounded-md p-2 text-sm ${pathname === "/home" ? "bg-primary/10 font-medium text-primary" : "text-sidebar-foreground"}`}
            >
              <Home className="size-4 shrink-0" aria-hidden="true" />
              <span>Início</span>
            </Link>
          </li>
          <li>
            <Link
              href="/institutions"
              aria-current={pathname === "/institutions" ? "page" : undefined}
              className={`flex w-full items-center gap-2 rounded-md p-2 text-sm ${pathname === "/institutions" ? "bg-primary/10 font-medium text-primary" : "text-sidebar-foreground"}`}
            >
              <Building2 className="size-4 shrink-0" aria-hidden="true" />
              <span>Instituições</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto flex items-end px-6 py-7">
        <LogoutButton />
      </div>
    </aside>
  );
}
