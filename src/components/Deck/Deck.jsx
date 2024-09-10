import { useState } from "react";
import { Button, DeckForm } from "../componentsImport.js";
import { updateDeck, deleteDeck } from "../../api/deckApi.js";
import Template from "../Template/Template.jsx";
import { usePopupsContext } from "../../utils/context/PopupsContext.jsx";

function Deck({ deck }) {
  const { id } = deck;
  const [name, setName] = useState(deck.name);
  const [description, setDescription] = useState(deck.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const { openDeletePopupHandler } = usePopupsContext();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateDeck(id, name, description);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsEditing(false);
      setIsLoading(false);
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
    <li className="flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      {isDeleting && <p>Deleting deck...</p>}
      <Template
        className="bg-yellow-200"
        heading={name}
        description={description}
      >
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
            onClick={() => openDeletePopupHandler({ type: "deck", id })}
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
      </Template>
    </li>
  );
}

export default Deck;
