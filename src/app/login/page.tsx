import { LoginForm } from "@/components/login/login-form";
import { LoginIntroduction } from "@/components/login/login-introduction";

export default function LoginPage() {
  return (
    <main className="grid min-h-svh grid-cols-[minmax(0,1fr)_minmax(420px,1fr)] bg-background max-md:grid-cols-1">
      <LoginIntroduction />
      <LoginForm />
    </main>
  );
}
