/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from "react";
import { UserType } from "../types/UserType";

interface GlobalData {
  user?: UserType;
}

interface DecodedProps {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface GlobalContextProps {
  globalData: GlobalData;
  setGlobalData: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});

  return <GlobalContext.Provider value={{ globalData, setGlobalData }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const setUser = (user: UserType) => {
    setGlobalData({
      ...globalData,
      user,
    });
  };

  return {
    user: globalData?.user,
    setUser,
  };
};
