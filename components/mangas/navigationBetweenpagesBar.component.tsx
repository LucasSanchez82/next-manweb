import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

const NavigationBetweenpagesBar = ({
  usePage,
  nbTotalPages,
}: {
  page: number;
  nbTotalPages: number;
  usePage: { page: number; setPage: Dispatch<SetStateAction<number>> };
}) => {
  const { page, setPage } = usePage;

  const handleClick = (isNext: boolean) => {
    if (isNext) {
      setPage((curr) => {
        return curr + 1;
      });
    } else if (page > 1) {
      setPage((curr) => {
        return curr - 1;
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

export default NavigationBetweenpagesBar;
