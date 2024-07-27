import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Card = {
  id: string
  question: string
  answer: string
}

const DeckDetails: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8080/decks/${deckId}/cards`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        console.log("Response status:", response.status)
        const data = await response.json()
        console.log("Fetched data:", data)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        setCards(data)
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
    fetchCards()
  }, [deckId])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className="">
      {cards.map(card => (
        <div key={card.deckId} className="bg-orange-300">
          <h2>Question: {card.Question}</h2>
          <h1>Answer: {card.Answer}</h1>
        </div>
      ))}
    </div>
  )
}

export default DeckDetails
