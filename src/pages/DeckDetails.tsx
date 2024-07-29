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
      answer: item.Answer
    }))
  }

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8080/decks/${deckId}/cards`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

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
    <div className="">
      {cards.map(card => (
        <div key={card.deckId} className="bg-orange-300">
          <h2>Question: {card.question}</h2>
          <h1>Answer: {card.answer}</h1>
        </div>
      ))}
    </div>
  )
}

export default DeckDetails
