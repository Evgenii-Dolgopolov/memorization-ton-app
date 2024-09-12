import React, { useEffect } from "react";
import Template from "../components/Template/Template.jsx";
import { useDecksContext } from "../utils/context/DecksContext.jsx";

const Play = () => {
  const { decks, handleFetchDecks } = useDecksContext();

  useEffect(() => {
    handleFetchDecks();
  }, []);

  return (
    <section className="p-8 h-screen bg-blue-300">
      <ul className="flex flex-col gap-6">
        {decks?.toReversed().map((deck) => (
          <Template
            className="bg-amber-600"
            key={deck.id}
            heading={deck.name}
            description={deck.description}
            to={`/cards/next/${deck.id}`}
          />
        ))}
      </ul>
    </section>
  );
};

export default Play;
