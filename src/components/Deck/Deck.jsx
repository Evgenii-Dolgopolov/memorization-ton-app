import React, { useEffect, useState } from "react";
import { Button, DeckForm } from "../componentsImport.js";
import { updateDeck, deleteDeck } from "../../utils/api.js";
import { UPDATE_SUCCESSFUL_MESSAGE } from "../../utils/constants.js";

function Deck({ deck, onDeleteClick }) {
  const { id } = deck;
  const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const data = await updateDeck(id, name, description);
      console.log(UPDATE_SUCCESSFUL_MESSAGE, data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      await deleteDeck(id);
      onDeleteClick(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return isEditing ? (
    <DeckForm
      buttonName={isLoading ? "Saving..." : "Save"}
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
      {isDeleting && <p>Deleting deck...</p>}
      <h2 className="font-bold text-lg px-4">{name}</h2>
      <p className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {description}
      </p>
      <div className="flex gap-4">
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          type="submit"
          onClick={handleEditClick}
        >
          Edit deck
        </Button>
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          type="submit"
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
