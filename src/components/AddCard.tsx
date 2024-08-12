import React, { useState, useEffect } from "react"
import CreateCard from "./CreateCard"
import CardItem from "./CardItem"

const AddCard: React.FC = () => {
  const [cards, setCards] = useState<{ id: string; question: string; answer: string }[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:8080/cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setCards(data)
    } catch (error) {
      console.error("Error fetching cards:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const handleCreateCard = async (data: { question: string; answer: string }) => {
    try {
      const response = await fetch("http://localhost:8080/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      console.log("Creating card with data:", data)
      await fetchCards() // Refresh the card list
    } catch (error) {
      console.error("Error creating card:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
      {error && <p className="text-red-500">{error}</p>}
      <CreateCard onCreate={handleCreateCard} />
      <div className="mt-4">
        {cards.map(card => (
          <CardItem key={card.id} id={card.id} question={card.question} answer={card.answer} fetchCards={fetchCards} />
        ))}
      </div>
    </div>
  )
}

export default AddCard