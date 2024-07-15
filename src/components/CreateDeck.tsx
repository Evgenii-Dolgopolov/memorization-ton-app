import React from "react"

type Deck = {
  name: string
  description: string
  userId: string
}

const CreateDeck = ({ onCreate }: { onCreate: (deck: Deck) => void }) => {
  const userId = "3a06fc24-becf-482a-8098-91470ce047d5"
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch("http://localhost:8080/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        userId,
      }),
    })

    if (response.ok) {
      const { id } = await response.json()
      // Fetch the details of the created deck using its id
      const deckResponse = await fetch(`http://localhost:8080/decks/${id}`)
      if (deckResponse.ok) {
        const newDeck = await deckResponse.json()
        console.log(newDeck)

        // Pass the full newDeck object to onCreate
        onCreate(newDeck)
        setName("")
        setDescription("")
        console.log("POST successful")
      } else {
        console.error("Failed to fetch deck details")
      }
    } else {
      console.error("Failed to create deck")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-1 flex-col bg-yellow-200 p-4 rounded-md shadow-md">
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Deck
        </button>
      </div>
    </form>
  )
}

export default CreateDeck
