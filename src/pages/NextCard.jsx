import { useState, useEffect } from "react";
import { nextCard as fetchNextCard } from "../api/cardApi.js";
import { useParams } from "react-router-dom";
import Template from "../components/Template/Template.jsx";

const NextCard = () => {
  const { deckId } = useParams();
  const [nextCard, setNextCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchNextCard(deckId)
      .then((data) => {
        setNextCard(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [deckId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {nextCard ? (
        <Template heading={nextCard.question} description={nextCard.answer} />
      ) : (
        <p>No card data available</p>
      )}
    </>
  );
};

export default NextCard;
