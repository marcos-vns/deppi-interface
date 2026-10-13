import Image from "next/image";

export function AppLogo() {
  return (
    <div className="inline-flex w-fit items-center gap-[11px] text-inherit" aria-label="Deppi IFCE Extensão">
      <span className="grid size-[42px] place-items-center overflow-hidden rounded-[10px] bg-surface">
        <Image className="size-[34px] object-contain" src="/ifce-logo.png" alt="" width={42} height={42} />
      </span>
      <span className="flex flex-col gap-px leading-[1.2]">
        <strong className="text-sm tracking-[.035em]">DEPPI</strong>
        <span className="text-[11px] text-text-secondary">IFCE · Extensão</span>
      </span>
    </div>
  );
}
