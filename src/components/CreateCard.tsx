import React, { useState } from "react"

interface CreateCardProps {
  onCreate: (data: { question: string; answer: string }) => void
}

const CreateCard: React.FC<CreateCardProps> = ({ onCreate }) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onCreate({ question, answer })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-blue-100 p-4 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
        <textarea
          id="answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Save</button>
    </form>
  )
}

export default CreateCard