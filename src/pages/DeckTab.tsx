import React, { useState } from "react"
import { Deck, CreateDeck } from "../components/index"

const DeckTab: React.FC = () => {
  const [decks, setDecks] = useState<any[]>([])
  const [showCreateDeckForm, setShowCreateDeckForm] = useState(false)
  const [showCreatedDeck, setShowCreatedDeck] = useState(false)

  const handleNewDeckClick = () => {
    setShowCreateDeckForm(true)
  }

  const handleCreateDeck = (newDeck: any) => {
    setDecks([...decks, newDeck])
    setShowCreateDeckForm(false)
    setShowCreatedDeck(true)
  }

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <button
        onClick={handleNewDeckClick}
        className="inline-flex justify-center px-4 py-2 border border-transparent text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        New Deck
      </button>
      {showCreateDeckForm && (
        <div className="flex flex-1 max-h-40 h-40 w-full bg-yellow-200 p-4 rounded-md shadow-md">
          <CreateDeck onCreate={handleCreateDeck} />
        </div>
      )}
      {showCreatedDeck &&
        decks.map((deck, index) => <Deck key={index} deck={deck} />)}
    </div>
  )
}

export default DeckTab
