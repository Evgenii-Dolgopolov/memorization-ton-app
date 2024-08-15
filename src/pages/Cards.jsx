import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardForm } from "../components/componentsImport.js";

function Cards() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createCardError, setCreateCardError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddCardClick = () => {
    setShowForm(!showForm);
  };

  const handleCardDelete = (deletedCardId) => {
    setCards((prevCards) =>
      prevCards.filter((card) => card.id !== deletedCardId)
    );
  };

  const transformData = (data) => {
    return data.map((item) => ({
      id: item.ID,
      question: item.Question,
      answer: item.Answer,
    }));
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/decks/${deckId}/cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const formattedData = transformData(data);
      setCards(formattedData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [deckId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleCreateCard = async (e) => {
    e.preventDefault();
    try {
      console.log("lol");
    } catch (error) {
      setCreateCardError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <h1 className="text-center text-4xl font-bold">Your Cards</h1>
      <Button
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleAddCardClick}
      >
        Add Card
      </Button>
      {showForm && (
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
      ) : cards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <ul className="flex flex-col items-center gap-4">
          {cards
            .slice()
            .reverse()
            .map((card) => (
              <Card
                key={card.id}
                id={card.id}
                card={card}
                onDeleteClick={handleCardDelete}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

export default Cards;
