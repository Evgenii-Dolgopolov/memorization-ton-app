import React, { useState } from "react"

type CardItemProps = {
  id: string
  question: string
  answer: string
  fetchCards: () => Promise<void>
}

const CardItem: React.FC<CardItemProps> = ({ id, question, answer, fetchCards }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newQuestion, setNewQuestion] = useState(question)
  const [newAnswer, setNewAnswer] = useState(answer)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/cards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Update successful:", data)
      await fetchCards()
    } catch (error) {
      console.error("Error updating card:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setIsLoading(false)
      setIsEditing(false)
    }
  }

  const handleDeleteClick = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:8080/cards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      await fetchCards() // Refetch cards after a card is deleted
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-36 bg-blue-200 rounded-md shadow-md p-4 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSaveClick} className="flex flex-col gap-4 w-full">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              id="question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              maxLength={100}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
            <textarea
              id="answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              maxLength={300}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <>
          <div className="font-bold text-lg px-4">{question}</div>
          <div className="text-sm text-center px-4 max-w-full lg:max-w-md">{answer}</div>
          <div className="flex gap-4">
            <button
              onClick={handleEditClick}
              className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-xs px-4 py-2 bg-blue-400 rounded-3xl"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CardItem