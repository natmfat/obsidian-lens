import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import LoadingIcon from "./LoadingIcon";

interface ButtonProps {
  loading?: boolean;
}

export const Button = ({
  className,
  children,
  loading,
  ...props
}: ComponentPropsWithoutRef<"button"> & ButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-slate-800 text-white rounded-md px-3 py-1.5 w-fit text-sm flex gap-2 items-center disabled:bg-opacity-75 ",
        className,
      )}
      disabled={loading}
      {...props}
    >
      <span>{children}</span>
      {loading && <LoadingIcon />}
    </button>
  );
};

export const Input = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      className={twMerge(
        "border rounded-md px-3 py-1.5 w-fit text-sm",
        className,
      )}
      {...props}
    />
  );
};
