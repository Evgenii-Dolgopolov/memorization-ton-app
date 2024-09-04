import { useState, useEffect } from "react";
import { nextCard as fetchNextCard } from "../api/cardApi.js";
import { useParams } from "react-router-dom";
import Template from "../components/Template/Template.jsx";
import { Button } from "../components/componentsImport.js";
import { RATING } from "../utils/constants.js";

function NextCard() {
  const { deckId } = useParams();
  const [nextCard, setNextCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasShownAnswer, setHasShownAnswer] = useState(false);

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

  const getCardValueByKey = (key) => {
    const ratingObject = RATING.find((value) =>
      Object.prototype.hasOwnProperty.call(value, key)
    );

    return ratingObject ? ratingObject[key] : null;
  };

  const handleRevealAnswerClick = () => {
    setHasShownAnswer(!hasShownAnswer);
  };

  return (
    <div className="flex flex-col m-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {nextCard ? (
        <div className="flex flex-col">
          <Template
            className="bg-green-300"
            heading={nextCard.question}
            description={hasShownAnswer ? nextCard.answer : ""}
          >
            <div className="flex flex-col gap-5">
              {!hasShownAnswer && (
                <Button
                  onClick={handleRevealAnswerClick}
                  className="inline-flex justify-center px-4 py-2 border border-transparent
                text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reveal Answer
                </Button>
              )}
            </div>
            <div className="flex gap-5">
              {RATING.map((ratingNumber, index) => (
                <Button
                  key={index}
                  value={getCardValueByKey(Object.keys(ratingNumber)[0])}
                >
                  {getCardValueByKey(Object.keys(ratingNumber)[0])}
                </Button>
              ))}
            </div>
          </Template>
        </div>
      ) : (
        <button>Button to transfer user to create cards</button>
      )}
    </div>
  );
}

export default NextCard;
