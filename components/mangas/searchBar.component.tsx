"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { InputHTMLAttributes, SyntheticEvent, useRef, useState } from "react";
import { setCookieSearchedTitle } from "./@actions/cookies";
import { OrderSearchDropdown } from "./orderSearchDropdown.component";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button aria-disabled={pending} type="submit">{pending ? "..." : "🔍"}</Button>;
};

const Searchbar = () => {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInputValue = () => {
    if(inputRef.current) {
      inputRef.current.value = ''
    }
  };

  const handleSubmit = async (formDataValue: FormData) => {
    const searchTitle = String(formDataValue.get("search"))
      .trim()
      .toLowerCase();

    setCookieSearchedTitle(searchTitle, pathname);
    clearInputValue();
  };
  return (
    <form
      action={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2 m-auto"
    >
      <Input ref={inputRef} type="search" name="search" placeholder="One piece..." />
      <SubmitButton />
      <OrderSearchDropdown />
    </form>
  );
};

export default Searchbar;
