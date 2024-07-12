import React from "react";
import { Card, CreateDeck } from "../components/index"


const Deck: React.FC = () => {
  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <Card />
      <CreateDeck />
    </div>
  );
};

export default Deck;