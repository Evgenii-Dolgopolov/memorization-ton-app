import { useState } from "react";
import { USER_ID as userId } from "../../utils/constants.js";
import { fetchDecks } from "../../api/deckApi.js";

const useDecks = () => {
  const [decks, setDecks] = useState([]);
  const [fetchDecksError, setFetchDecksError] = useState(null);
  const [deck, setDeck] = useState(
    localStorage.getItem("deck") ? JSON.parse(localStorage.getItem("deck")) : []
  );

  const handleFetchDecks = async () => {
    try {
      const data = await fetchDecks(userId);
      setDecks(data);
    } catch (error) {
      setFetchDecksError(error.message);
    }
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
  };
};

export default useDecks;
