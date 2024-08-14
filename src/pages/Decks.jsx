import { useState, useEffect } from "react";
import { Deck, Button, DeckForm } from "../components/componentsImport.js";
import { createDeck, fetchDecks as fetchDecksApi } from "../utils/api.js";
import { USER_ID as userId } from "../utils/constants.js";

function Decks() {
  const [decks, setDecks] = useState([]);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");

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

  useEffect(
    (de) => {
      fetchDecks();
    },
    [isCreatingDeck]
  );

  const handleNewDeckClick = () => {
    setIsCreatingDeck(!isCreatingDeck);
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await createDeck(deckName, description, userId);
      console.log("Deck created:", data);
    } catch (error) {
      console.error("Error creating deck:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
      setIsCreatingDeck(false);
    }
  };

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <Button
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleNewDeckClick}
      >
        New Deck
      </Button>
      {isCreatingDeck && (
        <DeckForm
          buttonName={isLoading ? "Creating..." : "Create Deck"}
          handleSubmit={handleCreateDeck}
          deckName={deckName}
          handleNameDeckChange={(e) => setDeckName(e.target.value)}
          description={description}
          handleDeckDescriptionChange={(e) => setDescription(e.target.value)}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {decks
            .slice()
            .reverse()
            .map((deck) => (
              <Deck key={deck.id} deck={deck} />
            ))}
        </ul>
      )}
    </div>
  );
}

export default Decks;
