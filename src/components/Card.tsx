import React from "react"

interface CardContainerProps {
  children: React.ReactNode
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return <div>{children}</div>
}

const Card: React.FC = () => {
  return (
    <CardContainer>
      <div className="flex flex-1 max-h-40 h-40 w-full bg-yellow-200 p-4">
        Card Content
      </div>
    </CardContainer>
  )
}

export default Card
