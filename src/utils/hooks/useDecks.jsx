import { useState } from "react";
import { USER_ID as userId } from "../../utils/constants.js";
import { fetchDecks } from "../../api/deckApi.js";

const useDecks = () => {
  const [decks, setDecks] = useState([]);
  const [fetchDecksError, setFetchDecksError] = useState(null);

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
  };
};

export default useDecks;
