import {
  PropsWithChildren,
  createContext
} from "react";

const MangaCurrSearchProvider = ({ children, currSearch }: PropsWithChildren<{currSearch: string}>) => {
  const CurrSearchContext = createContext("");

  return (
    <CurrSearchContext.Provider value={currSearch}>
      {children}
    </CurrSearchContext.Provider>
  );
};

export default MangaCurrSearchProvider;
