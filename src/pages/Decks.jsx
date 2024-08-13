import { useState, useEffect } from "react";
import {
  Deck,
  CreateDeckForm,
  Button,
} from "../components/componentsImport.js";
import Card from "../components/Card/Card.jsx";

function Decks() {
  const userId = "3a06fc24-becf-482a-8098-91470ce047d5";
  const [decks, setDecks] = useState([]);
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDecks = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userId}/decks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, [isCreatingDeck]);

  const handleNewDeckClick = () => {
    setIsCreatingDeck(true);
  };

  const handleCreateDeck = () => {
    setIsCreatingDeck(false);
    fetchDecks();
  };

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <Button
        buttonName="New Deck"
        className="inline-flex justify-center px-4 py-2 border border-transparent text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        handleClick={handleNewDeckClick}
      />
      {isCreatingDeck && <CreateDeckForm onCreate={handleCreateDeck} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        decks
          .slice()
          .reverse()
          .map((deck) => (
            <Deck
              key={deck.id}
              deck={deck}
              fetchDecks={fetchDecks}
              buttonsConfig={{
                edit: {
                  endpoint: `http://localhost:8080/decks/${deck.id}`,
                  method: "PATCH",
                },
                delete: {
                  endpoint: `http://localhost:8080/decks/${deck.id}`,
                  method: "DELETE",
                },
              }}
            />
          ))
      )}
    </div>
  );
}

export default Decks;
