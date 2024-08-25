"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  commonValue: string;
  setCommonValue: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [commonValue, setCommonValue] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  return (
    <AppContext.Provider
      value={{ commonValue, setCommonValue, userName, setUserName }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
