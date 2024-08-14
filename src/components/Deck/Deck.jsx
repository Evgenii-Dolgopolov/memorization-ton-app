import React, { useEffect, useState } from "react";
import { Button, DeckForm } from "../componentsImport.js";
import { updateDeck, deleteDeck } from "../../utils/api.js";

function Deck({ deck, fetchDecks }) {
  const { id } = deck;
  const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await updateDeck(id, name, description);
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating deck:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    try {
      await deleteDeck(id);
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    }
  };

  return isEditing ? (
    <DeckForm
      buttonName={isLoading ? "Editing..." : "Edit"}
      handleSubmit={handleSaveClick}
      deckName={name}
      handleNameDeckChange={(e) => setName(e.target.value)}
      description={description}
      handleDeckDescriptionChange={(e) => setDescription(e.target.value)}
    />
  ) : (
    <li
      className="flex flex-col items-center justify-center w-full min-h-36 bg-yellow-200
      rounded-md shadow-md p-4 gap-4"
    >
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="font-bold text-lg px-4">{name}</h2>
      <p className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {description}
      </p>
      <div className="flex gap-4">
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          type="button"
          onClick={handleEditClick}
        >
          Edit deck
        </Button>
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          type="button"
          onClick={handleDeleteClick}
        >
          Delete deck
        </Button>
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          to={`/decks/${id}/cards`}
        >
          Cards
        </Button>
      </div>
    </li>
  );
}

export default Deck;
