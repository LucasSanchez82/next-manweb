"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

//

export function SubmitButton({
  children,
  onload,
  className
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { onload?: () => any}>) {
  const { pending } = useFormStatus();
  const content = children ?? "Submit";
  useEffect(() => {
    if (pending && onload) {
      onload();
    }
  })

  return (
    <Button className={cn("rounded cursor-pointer p-1", className)} type="submit">
      {pending ? "..." : content}
    </Button>
  );
}
