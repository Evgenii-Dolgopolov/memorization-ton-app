import { useEffect, useState } from "react";
import { Button, Card, CardForm } from "../components/componentsImport.js";
import { createCard } from "../api/cardApi.js";
import { useCardsContext } from "../utils/context/CardsContext.jsx";
import { usePopupsContext } from "../utils/context/PopupsContext.jsx";
import { useDecksContext } from "../utils/context/DecksContext.jsx";

function Cards() {
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [createCardError, setCreateCardError] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { openDeletePopupHandler } = usePopupsContext();
  const { cards, handleFetchCards, isCardsLoading, fetchCardsError } =
    useCardsContext();
  const { deck } = useDecksContext();

  useEffect(() => {
    handleFetchCards(deck.id);
  }, [deck.id, isCreatingCard]);

  const handleAddCardClick = () => {
    setIsShowForm(!isShowForm);
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    setIsCreatingCard(true);
    try {
      await createCard(question, answer, deck.id);
      setQuestion("");
      setAnswer("");
      setIsShowForm(false);
    } catch (error) {
      setCreateCardError(error.message);
    } finally {
      setIsCreatingCard(false);
    }
  };

  return (
    <section className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <h1 className="text-center text-4xl font-bold">{deck.name}</h1>
      <Button
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleAddCardClick}
      >
        Add Card
      </Button>
      {isShowForm && (
        <CardForm
          buttonName={isCreatingCard ? "Creating..." : "Create Card"}
          question={question}
          handleQuestionChange={(e) => setQuestion(e.target.value)}
          answer={answer}
          handleAnswerChange={(e) => setAnswer(e.target.value)}
          handleSubmit={handleCreateCard}
          error={createCardError}
        />
      )}
      {isCardsLoading ? (
        <p>Loading...</p>
      ) : fetchCardsError ? (
        <p className="text-red-500">{fetchCardsError}</p>
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
