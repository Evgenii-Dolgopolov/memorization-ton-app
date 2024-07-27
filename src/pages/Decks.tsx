import React, { useState, useEffect } from "react"
import { Deck, CreateDeck } from "../components/index"

type Deck = {
  id: string
  name: string
  description: string
}

const Decks: React.FC = () => {
  const userId = "3a06fc24-becf-482a-8098-91470ce047d5"
  const [decks, setDecks] = useState<Deck[]>([])
  const [isCreatingDeck, setIsCreatingDeck] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${userId}/decks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        setDecks(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setIsLoading(false)
      }
    }
    console.log(decks)
    fetchData()
  }, [isCreatingDeck])

  const handleNewDeckClick = () => {
    setIsCreatingDeck(true)
  }

  const handleCreateDeck = () => {
    setIsCreatingDeck(false)
  }

  return (
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <button
        onClick={handleNewDeckClick}
        className="inline-flex justify-center px-4 py-2 border border-transparent text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        New Deck
      </button>
      {isCreatingDeck && <CreateDeck onCreate={handleCreateDeck} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        decks
          .slice()
          .reverse()
          .map(deck => <Deck key={deck.id} deck={deck} id={deck.id}/>)
      )}
    </div>
  )
}

export default Decks
