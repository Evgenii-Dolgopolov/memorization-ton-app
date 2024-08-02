import React from "react"

type CardItemProps = {
  id: string
  question: string
  answer: string
}

const CardItem: React.FC<CardItemProps> = ({ id, question, answer }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-36 bg-blue-200 rounded-md shadow-md p-4 gap-4">
      <div className="font-bold text-lg">{question}</div>
      <div className="text-sm text-center">{answer}</div>
      <div className="flex gap-4">
        <button className="text-xs px-4 py-2 bg-yellow-400 rounded-3xl">
          Edit
        </button>
        <button className="text-xs px-4 py-2 bg-yellow-400 rounded-3xl">
          Delete
        </button>
      </div>
    </div>
  )
}

export default CardItem
