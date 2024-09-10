import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardForm } from "../components/componentsImport.js";
import { createCard } from "../api/cardApi.js";
import { useCardsContext } from "../utils/context/CardsContext.jsx";
import { usePopupsContext } from "../utils/context/PopupsContext.jsx";

function Cards() {
  const { deckId } = useParams();
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createCardError, setCreateCardError] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { openDeletePopupHandler } = usePopupsContext();
  const { cards, handleFetchCards } = useCardsContext();

  useEffect(() => {
    handleFetchCards(deckId);
  }, [deckId, isCreatingCard]);

  const handleAddCardClick = () => {
    setIsCreatingCard(!isCreatingCard);
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createCard(question, answer, deckId);
      setQuestion("");
      setAnswer("");
      setIsCreatingCard(false);
    } catch (error) {
      setCreateCardError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <h1 className="text-center text-4xl font-bold">Your cards</h1>
      <Button
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleAddCardClick}
      >
        Add Card
      </Button>
      {isCreatingCard && (
        <CardForm
          buttonName={isLoading ? "Creating..." : "Create Card"}
          question={question}
          handleQuestionChange={(e) => setQuestion(e.target.value)}
          answer={answer}
          handleAnswerChange={(e) => setAnswer(e.target.value)}
          handleSubmit={handleCreateCard}
          error={createCardError}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cards?.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {cards?.toReversed().map((card, i) => (
            <Card key={i} card={card} onDeleteClick={openDeletePopupHandler} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default Cards;
