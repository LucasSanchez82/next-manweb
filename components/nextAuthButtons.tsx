"use client";
import { signIn, signOut } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { Button, ButtonProps } from "./ui/button";

export const SignInButtons = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.RefAttributes<HTMLButtonElement>>) => {
  return (
    <Button {...props} onClick={() => signIn()}>
      {children || "Se-connecter"}
    </Button>
  );
};

export const SignOutButtons = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps & React.RefAttributes<HTMLButtonElement>>) => {
  return (
    <Button {...props} variant="destructive" onClick={() => signOut()}>
      {children || "Se-déconnecter"}
    </Button>
  );
};
