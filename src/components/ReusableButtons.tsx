import React from "react"

type ReusableButtonsProps = {
  id: string
  onEditClick: () => void
  onDeleteClick: (event: React.MouseEvent) => void
  editButtonLabel: string
  deleteButtonLabel: string
  additionalButton?: React.ReactNode
}

const ReusableButtons: React.FC<ReusableButtonsProps> = ({
  onEditClick,
  onDeleteClick,
  editButtonLabel,
  deleteButtonLabel,
  additionalButton,
}) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onEditClick}
        className="text-xs px-4 py-2 bg-blue-400 rounded-3xl">
        {editButtonLabel}
      </button>
      <button
        onClick={onDeleteClick}
        className="text-xs px-4 py-2 bg-blue-400 rounded-3xl">
        {deleteButtonLabel}
      </button>
      {additionalButton}
    </div>
  )
}

export default ReusableButtons
