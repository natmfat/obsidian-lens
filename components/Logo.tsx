import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  variant?: "md" | "sm";
}

const Logo = ({ variant }: LogoProps) => {
  const size = variant === "sm" ? 30 : 40;

  return (
    <div
      className={twMerge(
        "flex items-center gap-1 select-none",
        variant === "sm" && "gap-1",
      )}
    >
      <Image src="/logo.png" alt="Obsidian Logo" width={size} height={size} />
      <h1
        className={twMerge(
          "uppercase font-bold text-2xl tracking-wider",
          variant === "sm" && "text-md",
        )}
      >
        Obsidian Viewer
      </h1>
    </div>
  );
};

export default Logo;
