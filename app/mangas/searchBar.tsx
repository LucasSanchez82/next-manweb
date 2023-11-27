"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SyntheticEvent, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const currSearchStr = searchParams.get("search");


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target;
    if (target instanceof HTMLFormElement) {
      const form = new FormData(target);
      const searchStr = String(form.get("search"));
      if (searchStr && searchStr !== currSearchStr) {
        router.push(pathname + "?" + createQueryString("search", searchStr));
        console.log(searchParams.get("search"));
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2 m-auto"
    >
      <Input type="search" name="search" placeholder="One piece..." />
      <Button type="submit">🔍</Button>
    </form>
  );
};

export default Searchbar;
