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

export function Forbidden() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-md gap-5 border-border bg-card px-8 py-8 text-center shadow-sm">
        <CardHeader className="justify-items-center px-0">
          <Badge variant="outline" className="text-text-auxiliary">403</Badge>
          <CardTitle
            className="mt-1 mb-0 text-3xl font-semibold tracking-[-.035em] text-text-main"
            id="forbidden-heading"
          >
            Acesso não autorizado
          </CardTitle>
          <CardDescription className="mt-1 text-base text-text-secondary">
            Você precisa entrar para acessar esta página.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Button asChild className="h-11 bg-primary px-5 text-white hover:bg-primary">
            <Link href="/login">Ir para o login</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
