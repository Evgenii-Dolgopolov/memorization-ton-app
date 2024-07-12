import React from "react"

interface DeckProps {
  deck: {
    ID: string
    Name: string
    Description: string
    UserID: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
  }
}

const Deck: React.FC<DeckProps> = ({ deck }) => {
  const { Name: name, Description: description } = deck

  return (
    <div className="flex flex-1 max-h-40 h-40 w-full bg-yellow-200 p-4 rounded-md shadow-md">
      <div className="flex flex-col gap-6">
        <div className="font-bold text-lg">Name: {name}</div>
        <div className="text-sm">Description: {description}</div>
      </div>
    </div>
  )
}

export default Deck
