import { useState } from "react";
import { fetchCards } from "../../api/cardApi.js";

const useCards = () => {
  const [cards, setCards] = useState([]);
  const [fetchCardsError, setFetchCardsError] = useState(null);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  const handleFetchCards = (deckId) => {
    setIsCardsLoading(true);
    fetchCards(deckId)
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        setFetchCardsError(error.message);
      })
      .finally(() => {
        setIsCardsLoading(false);
      });
  };

  return {
    cards,
    setCards,
    handleFetchCards,
    fetchCardsError,
    isCardsLoading,
  };
};

export default useCards;
