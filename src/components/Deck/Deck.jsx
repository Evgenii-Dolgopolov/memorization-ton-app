import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, CreateDeckForm, Input } from "../componentsImport.js";

const Deck = ({ deck, fetchDecks }) => {
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
      const response = await fetch(`http://localhost:8080/decks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      fetchDecks();
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
      const response = await fetch(`http://localhost:8080/decks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      await fetchDecks(); // Refetch decks after a deck is deleted
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-36 bg-yellow-200 rounded-md shadow-md p-4 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="font-bold text-lg px-4">{name}</h2>
      <p className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {description}
      </p>
      <div className="flex gap-4">
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          buttonName="Edit deck"
          type="button"
          handleClick={handleEditClick}
        />
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          buttonName="Delete deck"
          type="button"
          handleClick={handleDeleteClick}
        />
        {/*<Button*/}
        {/*  className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"*/}
        {/*  buttonName="Cards"*/}
        {/*  type="button"*/}
        {/*  handleClick={}*/}
        {/*/>*/}
        <Link to={`/decks/${id}/cards`}>Cards</Link>
      </div>
    </div>
  );
};

export default Deck;
