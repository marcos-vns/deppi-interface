import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6 py-12">
      <section className="max-w-md text-center" aria-labelledby="forbidden-heading">
        <p className="m-0 text-sm font-semibold text-text-auxiliary">403</p>
        <h1
          className="mt-3 mb-0 text-3xl font-semibold tracking-[-.035em] text-text-main"
          id="forbidden-heading"
        >
          Acesso não autorizado
        </h1>
        <p className="mt-3 mb-0 text-base text-text-secondary">
          Você precisa entrar para acessar esta página.
        </p>
        <Link
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white no-underline transition-colors hover:bg-primary/90"
          href="/login"
        >
          Ir para o login
        </Link>
      </section>
    </main>
  );
}
