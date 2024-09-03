import React, { useEffect, useState } from "react";
import { fetchDecks } from "../api/deckApi.js";
import { USER_ID as userId } from "../utils/constants.js";
import { Deck } from "../components/componentsImport.js";
import Template from "../components/Template/Template.jsx";

const Play = () => {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchDecks(userId)
      .then((data) => {
        setDecks(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4 h-screen bg-blue-300">
      <ul className="flex flex-col gap-6">
        {decks?.toReversed().map((deck) => (
          <Template className="bg-amber-600"
            key={deck.id}
            heading={deck.name}
            description={deck.description}
            to={`/cards/next/${deck.id}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default Play;
