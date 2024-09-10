import { useState } from "react";
import { Button, CardForm } from "../componentsImport.js";
import { updateCard } from "../../api/cardApi.js";
import Template from "../Template/Template.jsx";
import { usePopupsContext } from "../../utils/context/PopupsContext.jsx";

function Card({ card }) {
  const { id } = card;
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
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
      await updateCard(id, question, answer);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsEditing(false);
      setIsLoading(false);
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
    <li className="flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      {isDeleting && <p>Deleting deck...</p>}
      <Template className="bg-blue-200" heading={question} description={answer}>
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
            onClick={() => openDeletePopupHandler({ type: "card", id })}
          >
            Delete card
          </Button>
        </div>
      </Template>
    </li>
  );
}

export default Card;
