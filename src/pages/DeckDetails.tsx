import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Cards = {
  deckId: string
  question: string
  answer: string
}

const DeckDetails: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const [cards, setCards] = useState<Cards[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const transformData = (data: any) => {
    return data.map((item: any) => ({
      deckId: item.ID,
      question: item.Question,
      answer: item.Answer,
    }))
  }

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/decks/${deckId}/cards`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const data = await response.json()
        console.log("Fetched data:", data)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const formattedData = transformData(data)
        setCards(formattedData)
        console.log(cards)
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
    <div className="p-8 min-h-screen flex flex-col gap-6 bg-purple-300">
      <h1 className="flex flex-col gap-4 text-center text-4xl font-bold">
        Your Cards
      </h1>

      <div className="flex gap-4">
        <button className="flex-1 inline-flex justify-center px-4 py-2 border border-transparent text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit Deck
        </button>

        <button className="flex-1 inline-flex justify-center px-4 py-2 border border-transparent text-md font-bold rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Card
        </button>
      </div>

      <div className="bg-green-300">
        <div
          className="grid grid-cols-3 gap-4 bg-blue-200 p-2"
          style={{ gridTemplateColumns: "1fr 1fr 0.25fr" }}>
          <div className="font-bold">Question</div>
          <div className="font-bold">Answer</div>
          <div className="font-bold flex items-center justify-center">Edit</div>
        </div>
        {cards.map(card => (
          <div
            key={card.deckId}
            className="grid grid-cols-3 gap-4 bg-pink-300 p-2 my-2"
            style={{ gridTemplateColumns: "1fr 1fr 0.25fr" }}>
            <div className="text-sm">{card.question}</div>
            <div className="text-sm">{card.answer}</div>
            <button className="flex items-center justify-center">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeckDetails
