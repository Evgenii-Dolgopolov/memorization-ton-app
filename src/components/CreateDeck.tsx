import React, { useState } from "react"


const CreateDeck = ({ onCreate }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState("")

  const handleSubmit = async (e) => {
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
      const newDeck = await response.json()
      onCreate(newDeck)
    } else {
      console.error("Failed to create deck")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
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
      <div>
        <label
          htmlFor="userId"
          className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Deck
      </button>
    </form>
  )
}

export default CreateDeck
