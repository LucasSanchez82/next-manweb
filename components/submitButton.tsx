"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

//

export function SubmitButton({
  children,
  onload,
  className,
  altError,
  ...props
}: PropsWithChildren<
  ButtonProps & React.RefAttributes<HTMLButtonElement> & { onload?: () => any; altError?: React.ReactNode }
>) {
  const { pending } = useFormStatus();
  const content = children ?? "Submit";
  useEffect(() => {
    if (pending && onload) {
      onload();
    }
  });

  return (
    <Button
      {...props}
      className={cn("rounded cursor-pointer p-1", className)}
      type="submit"
    >
      {pending ? altError  || <Loader2 className="infinite-rotate" /> : content}
    </Button>
  );
}
