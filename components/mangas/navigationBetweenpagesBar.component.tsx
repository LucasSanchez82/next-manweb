import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { decrCookiePage, getPage, incrCookiePage } from "./@actions/cookies";

const NavigationBetweenPagesBar = ({nbTotalPages, page}: {nbTotalPages: number, page: number}) => {
  
  const handleClick = (isNext: boolean) => {
    if (isNext) {
      incrCookiePage();
    } else if (page > 1) {
      decrCookiePage();
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
