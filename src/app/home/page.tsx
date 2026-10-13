"use client";

import { useEffect, useSyncExternalStore } from "react";
import axios from "axios";
import { Home } from "lucide-react";
import { AppLogo } from "@/components/app-logo";
import { Forbidden } from "@/components/forbidden";
import { LogoutButton } from "@/components/logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

type Access = "allowed" | "forbidden";

type MeResponse = {
  id: string;
  name: string;
  email: string;
  roles: unknown[];
  permissions: unknown[];
};

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

export default function HomePage() {
  const access = useSyncExternalStore(
    subscribeToTokenChanges,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );

  useEffect(() => {
    if (access !== "allowed") return;

    const token = window.localStorage.getItem("token");
    if (!token) return;

    const controller = new AbortController();

    async function fetchMe() {
      try {
        const response = await axios.get<MeResponse>(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333"}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          },
        );

        console.log("/auth/me name and roles:", {
          name: response.data.name,
          roles: response.data.roles,
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to fetch /auth/me:", error);
        }
      }
    }

    void fetchMe();

    return () => controller.abort();
  }, [access]);

  if (access === "forbidden") return <Forbidden />;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-6 py-7">
          <AppLogo />
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive asChild>
                    <a href="/home">
                      <Home />
                      <span>Início</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto items-end px-6 py-7">
          <LogoutButton />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-3 border-b border-border px-6 py-4">
          <h1 className="m-0 text-xl font-semibold tracking-[-.03em] text-text-main" id="home-heading">
            Início
          </h1>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
