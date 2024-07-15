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
    <div className="flex flex-col items-center justify-center w-full bg-yellow-200 rounded-md shadow-md p-4 gap-4">
      <div className="font-bold text-lg px-4">{name}</div>
      <div className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {description}
      </div>
    </div>
  )
}

export default Deck
