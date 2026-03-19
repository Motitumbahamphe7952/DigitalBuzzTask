import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface ISectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  container?: boolean;
}

export default function Section({
  className = "",
  children,
  container = true,
  ...rest
}: ISectionProps) {
  return (
    <section className={cn("w-full px-5 md:px-20", className)} {...rest}>
      <div className={cn(container ? "max-w-7xl mx-auto" : "")}>{children}</div>
    </section>
  );
}
