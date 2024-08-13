import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  CardItem,
  CreateDeckForm,
  ReusableForm,
} from "../components/componentsImport.js";
import CreateCardForm from "../components/CreateCardForm/CreateCardForm.jsx";

function Cards() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleAddCardClick = () => {
    setShowForm(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <h1 className="text-center text-4xl font-bold">Your Cards</h1>
      <Button
        className="inline-flex justify-center px-4 py-2 border border-transparent
        text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        buttonName="Add Card"
        type="button"
        handleClick={handleAddCardClick}
      />

      <CreateCardForm />

      {showForm && (
        <ReusableForm
          actionType="createCard"
          fetchData={fetchCards}
          closeForm={() => setShowForm(false)}
        />
      )}
      <div className="flex flex-col items-center gap-4">
        {cards?.length === 0 ? (
          <p>No cards found.</p>
        ) : (
          cards?.map((card) => (
            <CardItem
              key={card.id}
              id={card.id}
              question={card.question}
              answer={card.answer}
              fetchCards={fetchCards}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Cards;
