import React, { createContext, useState } from "react";
import { PlayContextType } from "../@types";

interface PlayContextProviderProps {
  children: JSX.Element;
};

export const PlayContext = createContext<PlayContextType | null>(null);

function PlayContextProvider({ children }: PlayContextProviderProps): JSX.Element  {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      {children}
    </PlayContext.Provider>
  );
}

export default PlayContextProvider;
