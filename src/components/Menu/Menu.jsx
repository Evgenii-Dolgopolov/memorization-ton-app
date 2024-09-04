import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const currentTab = location.pathname.substring(1);

  const styleActiveTab = "bg-blue-400 text-white shadow-2xl";

  const playIconRef = useRef(null);
  const decksIconRef = useRef(null);
  const settingsIconRef = useRef(null);

  useEffect(() => {
    const iconRefs = [playIconRef, decksIconRef, settingsIconRef];

    iconRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("fa-bounce");
      }
    });

    const activeRef = iconRefs.find(
      (ref) =>
        ref.current && ref.current.closest("a")?.pathname === location.pathname
    );
    if (activeRef?.current) {
      activeRef.current.classList.add("fa-bounce");

      setTimeout(() => {
        activeRef.current?.classList.remove("fa-bounce");
      }, 750);
    }
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 w-full h-1/6 bg-white shadow-lg">
      <div className="h-full flex m-auto justify-around">
        <Link
          to="/play"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "play" ? styleActiveTab : ""
          }`}
        >
          <i ref={playIconRef} className="fa-solid fa-brain fa-3x"></i>
        </Link>

        <Link
          to="/decks"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "decks" ? styleActiveTab : ""
          }`}
        >
          <i ref={decksIconRef} className="fa-solid fa-layer-group fa-3x"></i>
        </Link>

        <Link
          to="/settings"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "settings" ? styleActiveTab : ""
          }`}
        >
          <i ref={settingsIconRef} className="fa-solid fa-gear fa-3x"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Menu;
