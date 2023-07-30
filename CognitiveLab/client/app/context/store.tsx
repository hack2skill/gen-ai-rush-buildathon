'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface GlobalContextType {
  project: string;
  setProject: (project: string) => void;
  project_type: string;
  setProjectType: (project_type: string) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  project: '',
  project_type: '',
  setProject: (project: string): void => {
    throw new Error('Function not implemented.');
  },
  setProjectType: (project_type: string): void => {
    throw new Error('Function not implemented.');
  },
});
// @ts-ignore
export const GlobalContextProvider = ({ children }) => {
  const [project, setProject] = useState<string>('');
  const [project_type, setProjectType] = useState<string>('');

  return (
    <GlobalContext.Provider
      value={{
        project,
        setProject,
        project_type,
        setProjectType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
