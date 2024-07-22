import React, { useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const Menu: React.FC = () => {
  const location = useLocation()
  const currentTab = location.pathname.substring(1)

  const styleActiveTab = "bg-blue-400 text-white shadow-2xl"

  const playIconRef = useRef<HTMLElement>(null)
  const decksIconRef = useRef<HTMLElement>(null)
  const statisticsIconRef = useRef<HTMLElement>(null)
  const settingsIconRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const iconRefs = [
      playIconRef,
      decksIconRef,
      statisticsIconRef,
      settingsIconRef,
    ]

    iconRefs.forEach(ref => {
      if (ref.current) {
        ref.current.classList.remove("fa-bounce")
      }
    })

    const activeRef = iconRefs.find(
      ref =>
        ref.current && ref.current.closest("a")?.pathname === location.pathname
    )
    if (activeRef?.current) {
      activeRef.current.classList.add("fa-bounce")

      setTimeout(() => {
        activeRef.current?.classList.remove("fa-bounce")
      }, 750)
    }
  }, [location.pathname])

  return (
    <menu className="fixed bottom-0 left-0 w-full h-1/6 bg-white shadow-lg">
      <div className="h-full flex m-auto justify-around">
        <Link
          to="/play"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "play" ? styleActiveTab : ""
          }`}>
          <i ref={playIconRef} className="fa-solid fa-brain fa-3x"></i>
        </Link>

        <Link
          to="/decks"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "decks" ? styleActiveTab : ""
          }`}>
          <i ref={decksIconRef} className="fa-solid fa-layer-group fa-3x"></i>
        </Link>

        <Link
          to="/statistics"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "statistics" ? styleActiveTab : ""
          }`}>
          <i
            ref={statisticsIconRef}
            className="fa-solid fa-chart-simple fa-3x"></i>
        </Link>

        <Link
          to="/settings"
          className={`w-full flex items-center justify-center border-2 border-none ${
            currentTab === "settings" ? styleActiveTab : ""
          }`}>
          <i ref={settingsIconRef} className="fa-solid fa-gear fa-3x"></i>
        </Link>
      </div>
    </menu>
  )
}

export default Menu
