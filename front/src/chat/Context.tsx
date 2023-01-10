import { createContext, useContext } from "react";

export const MyGlobalContext = createContext<any>({})
export const useGlobalContext = () => useContext(MyGlobalContext)