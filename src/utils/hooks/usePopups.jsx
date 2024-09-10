import { useState } from "react";

const usePopups = () => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const openDeletePopupHandler = (item) => {
    setDeleteItem(item);
    setIsDeletePopupOpen(true);
  };

  const popupCloseHandler = () => {
    setIsDeletePopupOpen(false);
    document.body.style.overflow = "";
  };

  return {
    isDeletePopupOpen,
    deleteItem,
    openDeletePopupHandler,
    popupCloseHandler,
  };
};

export default usePopups;
