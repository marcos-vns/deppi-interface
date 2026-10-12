import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export function Button({ variant = "default", ...props }: ButtonProps) {
  return <button data-variant={variant} {...props} />;
}
