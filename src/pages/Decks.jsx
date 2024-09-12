import { useState, useEffect } from "react";
import { Deck, Button, DeckForm } from "../components/componentsImport.js";
import { createDeck } from "../api/deckApi.js";
import { USER_ID as userId } from "../utils/constants.js";
import { usePopupsContext } from "../utils/context/PopupsContext.jsx";
import { useDecksContext } from "../utils/context/DecksContext.jsx";

function Decks() {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createDeckError, setCreateDeckError] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const { openDeletePopupHandler } = usePopupsContext();
  const { decks, handleFetchDecks, fetchDecksError, isDecksLoading } =
    useDecksContext();

  useEffect(() => {
    handleFetchDecks();
  }, [isCreating]);

  const handleNewDeckClick = () => {
    setIsShowForm(!isShowForm);
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await createDeck(deckName, description, userId);
      setDeckName("");
      setDescription("");
      setIsShowForm(false);
    } catch (error) {
      setCreateDeckError(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <Button
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleNewDeckClick}
      >
        New Deck
      </Button>
      {isShowForm && (
        <DeckForm
          buttonName={isCreating ? "Creating..." : "Create Deck"}
          handleSubmit={handleCreateDeck}
          deckName={deckName}
          handleNameDeckChange={(e) => setDeckName(e.target.value)}
          description={description}
          handleDeckDescriptionChange={(e) => setDescription(e.target.value)}
          error={createDeckError}
        />
      )}
      {isDecksLoading ? (
        <p>Loading...</p>
      ) : fetchDecksError ? (
        <p className="text-red-500">{fetchDecksError}</p>
      ) : decks && decks?.length === 0 ? (
        <p>No decks found.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {decks?.toReversed().map((deck) => (
            <Deck
              key={deck.id}
              deck={deck}
              onDeleteClick={openDeletePopupHandler}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default Decks;
