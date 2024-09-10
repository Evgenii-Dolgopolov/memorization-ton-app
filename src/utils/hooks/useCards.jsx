import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCards } from "../../api/cardApi.js";

const useCards = () => {
  // const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [fetchCardsError, setFetchCardsError] = useState(null);

  const handleFetchCards = async (deckId) => {
    try {
      const data = await fetchCards(deckId);
      setCards(data);
    } catch (error) {
      setFetchCardsError(error.message);
    }
  };

  return {
    cards,
    setCards,
    handleFetchCards,
    fetchCardsError,
  };
};

export default useCards;
