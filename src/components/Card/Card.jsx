import React, { useState } from "react";
import { Button } from "../componentsImport.js";
import CreateCardForm from "../CreateCardForm/CreateCardForm.jsx";

const Card = ({ id, question, answer, fetchCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/cards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      await fetchCards();
    } catch (error) {
      console.error("Error updating card:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/cards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      await fetchCards(); // Refetch cards after a card is deleted
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    }
  };

  return isEditing ? (
    <CreateCardForm />
  ) : (
    <div
      className="flex flex-col items-center justify-center w-full min-h-36 bg-blue-200
      rounded-md shadow-md p-4 gap-4"
    >
      <h2 className="font-bold text-lg px-4">{question}</h2>
      <p className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {answer}
      </p>
      <div className="flex gap-4">
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          buttonName="Edit card"
          type="button"
          onClick={handleEditClick}
        />
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          buttonName="Delete card"
          type="submit"
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default Card;
