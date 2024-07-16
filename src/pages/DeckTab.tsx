import React, { useState, useEffect } from "react"
import { Deck, CreateDeck } from "../components/index"
// import useSWR from "swr"

const DeckTab: React.FC = () => {
  const userId = "3a06fc24-becf-482a-8098-91470ce047d5"
  const [decks, setDecks] = useState<any[]>([])
  const [isCreatingDeck, setIsCreatingDeck] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  //   fetch(...args).then(res = res.json())
  // const apiUrl = `http://localhost:8080/users/${userId}/decks`
  // const options = {
  //   method: "GET",
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // }

  // const { data, err, isLoading } = useSWR([apiUrl, options], fetcher)

  // console.log(data)

  useEffect(() => {
    console.log("useEffect triggered")
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
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  console.log(decks)

  const handleNewDeckClick = () => {
    setIsCreatingDeck(true)
  }

  const handleCreateDeck = (newDeck: any) => {
    setDecks([...decks, newDeck])
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        decks.map(deck => <Deck key={deck.id} deck={deck} />)
      )}
    </div>
  )
}

export default DeckTab
