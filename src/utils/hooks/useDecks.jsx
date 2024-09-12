import { useState } from "react";
import { USER_ID as userId } from "../../utils/constants.js";
import { fetchDecks } from "../../api/deckApi.js";

const useDecks = () => {
  const [decks, setDecks] = useState([]);
  const [fetchDecksError, setFetchDecksError] = useState(null);
  const [deck, setDeck] = useState(
    localStorage.getItem("deck") ? JSON.parse(localStorage.getItem("deck")) : []
  );
  const [isDecksLoading, setIsDecksLoading] = useState(false);

  const handleFetchDecks = () => {
    setIsDecksLoading(true);
    fetchDecks(userId)
      .then((data) => {
        setDecks(data);
      })
      .catch((error) => {
        setFetchDecksError(error.message);
      })
      .finally(() => {
        setIsDecksLoading(false);
      });
  };

  const deckSetter = (newDeck) => {
    setDeck(newDeck);
    localStorage.setItem("deck", JSON.stringify(newDeck));
  };

  return {
    decks,
    setDecks,
    handleFetchDecks,
    fetchDecksError,
    deck,
    deckSetter,
    isDecksLoading,
  };
};

export default useDecks;
