import { createContext, useContext } from "react";
import useCards from "../hooks/useCards.jsx";

const CardsContext = createContext();

export function CardsProvider(props) {
  const cards = useCards();

  return <CardsContext.Provider value={cards} {...props} />;
}

export function useCardsContext() {
  return useContext(CardsContext);
}
