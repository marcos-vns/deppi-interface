type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-border px-6 py-4">
      <h1 className="m-0 text-xl font-semibold tracking-[-.03em] text-text-main">
        {title}
      </h1>
    </header>
  );
}
