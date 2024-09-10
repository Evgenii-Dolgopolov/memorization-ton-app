import Popup from "../Popup/Popup.jsx";
import { Button } from "../componentsImport.js";
import { usePopupsContext } from "../../utils/context/PopupsContext.jsx";
import { deleteDeck } from "../../api/deckApi.js";
import { deleteCard } from "../../api/cardApi.js";
import { useState } from "react";

const DeletePopup = () => {
  const { isDeletePopupOpen, deleteItem, popupCloseHandler } =
    usePopupsContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    debugger;
    try {
      if (deleteItem?.type === "deck") {
        await deleteDeck(deleteItem.id);
        // onDeleteClick(deleteItem.id);
      } else if (deleteItem?.type === "card") {
        await deleteCard(deleteItem.id); // реализуйте функцию удаления карточки
      }
      popupCloseHandler(); // Закрыть попап после удаления
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Popup isOpen={isDeletePopupOpen} onClose={popupCloseHandler}>
      <div
        className="flex flex-col relative max-w-190 min-w-72 w-full
        bg-white rounded-md mx-16 my-auto items-center p-8 gap-8"
      >
        <h2 className="text-center font-bold">
          Are you sure you want to delete?
        </h2>
        <div className="flex gap-8">
          <Button
            className="text-xs px-4 py-2 bg-green-200 rounded-3xl"
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            className="text-xs px-4 py-2 bg-red-200 rounded-3xl"
            onClick={popupCloseHandler}
          >
            No
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default DeletePopup;
