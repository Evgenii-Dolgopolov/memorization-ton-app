import { useState, useEffect } from "react";
import {
  Deck,
  CreateDeckForm,
  Button,
} from "../components/componentsImport.js";
import { fetchDecks as fetchDecksApi } from "../utils/api.js";
import { USER_ID as userId } from "../utils/constants.js";

function Decks() {
  const [decks, setDecks] = useState([]);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDecks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDecksApi(userId);
      setDecks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setDecks(fetchDecks);
  }, [isCreatingDeck]);

  const handleNewDeckClick = () => {
    setIsCreatingDeck(!isCreatingDeck);
  };

  const handleCreateDeck = () => {
    setIsCreatingDeck(false);
    setDecks(fetchDecks);
  };

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <Button
        buttonName="New Deck"
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleNewDeckClick}
      />
      {isCreatingDeck && <CreateDeckForm />}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        decks
          .slice()
          .reverse()
          .map((deck) => <Deck key={deck.id} deck={deck} />)
      )}
    </div>
  );
}

export default Decks;
