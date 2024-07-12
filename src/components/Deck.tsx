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
    <div className="flex flex-1 max-h-40 h-40 w-full bg-yellow-200 rounded-md shadow-md">
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <div className="text-center font-bold text-lg px-6">{name}</div>
        <div className="text-center text-sm px-6 max-w-md">{description}</div>
      </div>
    </div>
  )
}

export default Deck
