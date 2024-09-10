import { useState } from "react";
import { USER_ID as userId } from "../../utils/constants.js";
import { createDeck, fetchDecks } from "../../api/deckApi.js";

const useDecks = () => {
  const [decks, setDecks] = useState([]);
  const [fetchDecksError, setFetchDecksError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const handleFetchDecks = async () => {
    try {
      const data = await fetchDecks(userId);
      setDecks(data);
    } catch (error) {
      setFetchDecksError(error.message);
    }
  };

  return {
    decks,
    setDecks,
    handleFetchDecks,
    fetchDecksError,
    // isLoading,
    // setIsLoading,
  };
};

export default useDecks;
