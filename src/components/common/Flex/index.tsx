
import { cn } from "@/lib/utils";
import type { IFlexContainerProps } from "../types";

export default function Flex({
  className = "",
  children,
  gap,
  md,
  ...rest
}: IFlexContainerProps) {
  let newClassNames = "";
  if (md) newClassNames += `md:flex-row `;

  return (
    <div
      className={cn(
        `flex flex-col ${newClassNames}
      ${className}`,
      )}
      {...rest}
      style={{
        gap: gap ? `${gap * 0.25}rem` : "",
      }}
    >
      {children}
    </div>
  );
}
