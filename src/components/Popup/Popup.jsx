import { useEffect } from "react";

const Popup = ({ isOpen, children }) => {
  useEffect(() => {
    if (isOpen && typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  return (
    <div
      className={`popup ${
        isOpen ? "opacity-100 visible z-20" : "opacity-0 collapse"
      } flex justify-center w-full h-full fixed top-0 left-0 right-0 bg-black/50
        overflow-y-auto py-6 transition-all duration-300`}
    >
      {children}
    </div>
  );
};

export default Popup;
