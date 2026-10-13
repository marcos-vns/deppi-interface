"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("auth-token-change", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("auth-token-change", onChange);
  };
}

function getSnapshot() {
  return !!window.localStorage.getItem("token");
}

function getServerSnapshot() {
  return false;
}

export default function NotFound() {
  const isLoggedIn = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-md gap-5 border-border bg-card px-8 py-8 text-center shadow-sm">
        <CardHeader className="justify-items-center px-0">
          <Badge variant="outline" className="text-text-auxiliary">
            404
          </Badge>
          <CardTitle className="mt-1 mb-0 text-3xl font-semibold tracking-[-.035em] text-text-main">
            Página não encontrada
          </CardTitle>
          <CardDescription className="mt-1 text-base text-text-secondary">
            A página que você está procurando não existe ou foi movida.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Button asChild className="h-11 bg-primary px-5 text-white hover:bg-primary/90">
            <Link href={isLoggedIn ? "/home" : "/login"}>
              {isLoggedIn ? "Voltar ao início" : "Voltar ao login"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
