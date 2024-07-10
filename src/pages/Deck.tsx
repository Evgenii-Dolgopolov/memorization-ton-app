import React from "react";
import Card from "../components/Card";

const Deck: React.FC = () => {
  return (
    <div className="p-8 h-full flex flex-col  gap-6 bg-purple-300">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      {/* Add more Card components as needed */}
    </div>
  );
};

export default Deck;