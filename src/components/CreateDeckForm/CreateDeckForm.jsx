import { useState } from "react";
import { Button, Input } from "../componentsImport.js";

function CreateDeckForm({ fetchDecks }) {
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: deckName,
          description,
          userId: "3a06fc24-becf-482a-8098-91470ce047d5",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Deck created:", data);
      fetchDecks();
    } catch (error) {
      console.error("Error creating deck:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreateDeck}
      className="flex flex-col w-full items-center justify-center min-h-36 bg-yellow-200
      rounded-md shadow-md p-4 gap-4"
    >
      {error && <p className="text-red-500">{error}</p>}
      <Input
        id="deck-name"
        name="deckName"
        label="Deck Name"
        value={deckName}
        handleChange={(e) => setDeckName(e.target.value)}
        maxLength={100}
        type="text"
        // required
      />
      <Input
        id="deck-description"
        name="deckDescription"
        label="Description"
        value={description}
        handleChange={(e) => setDescription(e.target.value)}
        maxLength={300}
        type="text"
        textarea
        // required
      />
      <Button
        className="mt-4 w-full flex items-center justify-center px-4 py-2 border
        border-transparent text-sm font-medium rounded-md shadow-sm text-white
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-indigo-500"
        buttonName={isLoading ? "Creating..." : "Create Deck"}
        type="submit"
        handleClick={handleCreateDeck}
      />
    </form>
  );
}

export default CreateDeckForm;
