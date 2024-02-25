"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { SubmitButton } from "../../submitButton";
import { addSearchParams } from "../../../lib/searchParams";
import { resetCookiePage } from "../@actions/cookies";

const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const clearInputValue = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const searchProcess = (searchValue: string) => {
    const searchTitle = searchValue.trim().toLowerCase();
    addSearchParams({
      values: [{ key: "search", value: searchTitle }, { key: "page", value: "1" }],
      pathname,
      searchParams,
      router,
    });
    clearInputValue();
  };

  const handleAction = async (formDataValue: FormData) => {
    searchProcess(String(formDataValue.get("search") || ""));
  };

  return (
    <>
      <form
        // action={handleAction}
        action={handleAction}
        className="flex w-full max-w-sm items-center space-x-2 m-auto"
      >
        <Input
          ref={inputRef}
          type="search"
          name="search"
          placeholder="One piece..."
        />
        <SubmitButton>🔍</SubmitButton>
      </form>
    </>
  );
};

export default Searchbar;
