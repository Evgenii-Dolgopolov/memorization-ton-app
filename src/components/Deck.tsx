import React, { useState } from "react"
import { Link } from "react-router-dom"

type DeckProps = {
  deck: {
    id: string
    name: string
    description: string
  }
  fetchDecks: () => Promise<void>
}

const Deck: React.FC<DeckProps> = ({ deck, fetchDecks }) => {
  const { id } = deck
  const [name, setName] = useState(deck.name)
  const [description, setDescription] = useState(deck.description)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/decks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Update successful:", data)
      fetchDecks()
    } catch (error) {
      console.error("Error updating deck:", error)
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
      const response = await fetch(`http://localhost:8080/decks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      await fetchDecks() // Refetch decks after a deck is deleted
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-36 bg-yellow-200 rounded-md shadow-md p-4 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSaveClick} className="flex flex-col gap-4 w-full">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={20}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={70}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <>
          <div className="font-bold text-lg px-4">{name}</div>
          <div className="text-sm text-center px-4 max-w-full lg:max-w-md">
            {description}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEditClick}
              className="text-xs px-4 py-2 bg-blue-400 rounded-3xl">
              Edit deck
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-xs px-4 py-2 bg-blue-400 rounded-3xl">
              Delete deck
            </button>
            <Link to={`/decks/${id}/cards`}>
              <button className="text-xs px-4 py-2 bg-blue-400 rounded-3xl">
                Cards
              </button>
            </Link>
            <button className="text-xs px-4 py-2 bg-blue-400 rounded-3xl">
              ...
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Deck
