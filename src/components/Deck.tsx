import React from "react"

interface DeckProps {
  deck: {
    name: string
    description: string
  }
}

const Deck: React.FC<DeckProps> = ({ deck }) => {
  return (
    <div className="flex flex-1 max-h-40 h-40 w-full bg-yellow-200 p-4 rounded-md shadow-md">
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg">{deck.name}</div>
        <div className="text-sm">{deck.description}</div>
      </div>
    </div>
  )
}

export default Deck
