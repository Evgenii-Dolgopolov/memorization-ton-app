import { createContext, useContext } from "react";
import usePopups from "../hooks/usePopups.jsx";

const PopupsContext = createContext();

export function PopupsProvider(props) {
  const popups = usePopups();

  return <PopupsContext.Provider value={popups} {...props} />;
}

export function usePopupsContext() {
  return useContext(PopupsContext);
}
