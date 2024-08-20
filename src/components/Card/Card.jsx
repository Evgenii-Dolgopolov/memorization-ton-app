import { useState } from "react";
import { Button, CardForm } from "../componentsImport.js";
import { deleteCard, updateCard } from "../../api/cardApi.js";

function Card({ card, onDeleteClick }) {
  const { id } = card;
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateCard(id, question, answer);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await deleteCard(id);
      onDeleteClick(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return isEditing ? (
    <CardForm
      buttonName={isLoading ? "Saving..." : "Save"}
      handleSubmit={handleSaveClick}
      question={question}
      handleQuestionChange={(e) => setQuestion(e.target.value)}
      answer={answer}
      handleAnswerChange={(e) => setAnswer(e.target.value)}
    />
  ) : (
    <li
      className="flex flex-col items-center justify-center w-full min-h-36 bg-blue-200
      rounded-md shadow-md p-4 gap-4"
    >
      {error && <p className="text-red-500">{error}</p>}
      {isDeleting && <p>Deleting deck...</p>}
      <h2 className="font-bold text-lg px-4">{question}</h2>
      <p className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {answer}
      </p>
      <div className="flex gap-4">
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          type="submit"
          onClick={handleEditClick}
        >
          Edit card
        </Button>
        <Button
          className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
          type="submit"
          onClick={handleDeleteClick}
        >
          Delete card
        </Button>
      </div>
    </li>
  );
}

export default Card;
