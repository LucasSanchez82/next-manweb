import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const MangaCardLoading = () => {
  return (
    <Card className="p-5 m-5 max-w-[300px] h-[200px] flex flex-col justify-around ">
      <Skeleton className="w-[200px] h-[20px] mb-[10px] m-auto" />
      <Skeleton className="p-5 w-3/4 h-[100px] m-auto" />
      <div className="flex flex-row justify-between m-100 items-center">
        <Skeleton className="w-[75px] h-[20px] mb-[10px] m-auto" />
        <Skeleton className="w-[50px] h-[20px] m-auto" />
      </div>
    </Card>
  );
};

export default MangaCardLoading;
