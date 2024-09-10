import { createContext, useContext } from "react";
import useDecks from "../hooks/useDecks.jsx";

const DecksContext = createContext();

export function DecksProvider(props) {
  const decks = useDecks();

  return <DecksContext.Provider value={decks} {...props} />;
}

export function useDecksContext() {
  return useContext(DecksContext);
}
