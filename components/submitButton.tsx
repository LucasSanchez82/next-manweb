"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

//

export function SubmitButton({
  children,
  pendingCallback,
  className,
  altPending: altError,
  ...props
}: PropsWithChildren<
  ButtonProps &
    React.RefAttributes<HTMLButtonElement> & {
      pendingCallback?: (pending: boolean) => any;
      altPending?: React.ReactNode;
    }
>) {
  const { pending } = useFormStatus();
  const content = children ?? "Submit";
  if (pendingCallback) {
    console.log('🪄🪄🪄🪄')
    useEffect(() => {
      pendingCallback(pending);
    }, [pending]);
  }
  return (
    <Button
      {...props}
      className={cn("rounded cursor-pointer p-1", className)}
      type="submit"
      disabled={pending}
    >
      {pendingCallback
        ? content
        : pending
        ? altError || <Loader2 className="infinite-rotate" />
        : content}
    </Button>
  );
}
