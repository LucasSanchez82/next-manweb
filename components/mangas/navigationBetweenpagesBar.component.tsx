"use client";
import { addSearchParams } from "@/lib/searchParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const NavigationBetweenPagesBar = ({
  nbTotalPages,
  page,
}: {
  nbTotalPages: number;
  page: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleClick = (isNext: boolean) => {
    if (isNext && page <= nbTotalPages) {
      addSearchParams({
        pathname,
        searchParams,
        router,
        values: [{ key: "page", value: String(page + 1) }],
      });
    } else if (page > 1) {
      addSearchParams({
        pathname,
        searchParams,
        router,
        values: [{ key: "page", value: String(page - 1) }],
      });
    }
  };
  return (
    <div className="flex justify-center items-center ">
      {page > 1 && (
        <Button onClick={() => handleClick(false)} className="bg-primary">
          precedent
        </Button>
      )}
      <span className="ml-2 mr-2">
        {page} / {nbTotalPages}
      </span>
      {page < nbTotalPages && (
        <Button
          onClick={() => handleClick(true)}
          className="bg-secondary text-primary hover:text-secondary"
        >
          suivant
        </Button>
      )}
    </div>
  );
};

export default NavigationBetweenPagesBar;
