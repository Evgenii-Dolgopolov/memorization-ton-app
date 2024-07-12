import React from "react"

interface FooterProps {
  setCurrentTab: (tab: string) => void
}

const Footer: React.FC<FooterProps> = ({ currentTab, setCurrentTab }) => {
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)

    // Animate menu icons on click
    const iconElement = document.querySelector(`#${tab}Button i`)
    if (iconElement) {
      iconElement.classList.add("fa-bounce")

      setTimeout(() => {
        iconElement.classList.remove("fa-bounce")
      }, 750)
    }
  }

  return (
    <menu className="fixed bottom-0 left-0 w-full h-1/6 bg-white shadow-lg">
      <div className="h-full flex m-auto justify-around">
        <button
          id="LearnButton"
          onClick={() => handleTabChange("Learn")}
          className={`w-full border-2 border-none ${currentTab === "Learn" ? "bg-blue-400 text-white shadow-2xl" : ""}`}>
          <i className="fa-solid fa-brain fa-3x"></i>
        </button>
        <button
          id="DeckButton"
          onClick={() => handleTabChange("Deck")}
          className={`w-full border-2 border-none ${currentTab === "Deck" ? "bg-blue-400 text-white shadow-2xl" : ""}`}>
          <i className="fa-solid fa-layer-group fa-3x"></i>
        </button>
        <button
          id="StatisticsButton"
          onClick={() => handleTabChange("Statistics")}
          className={`w-full border-2 border-none ${currentTab === "Statistics" ? "bg-blue-400 text-white shadow-2xl" : ""}`}>
          <i className="fa-solid fa-chart-simple fa-3x"></i>
        </button>
        <button
          id="SettingsButton"
          onClick={() => handleTabChange("Settings")}
          className={`w-full border-2 border-none ${currentTab === "Settings" ? "bg-blue-400 text-white shadow-2xl" : ""}`}>
          <i className="fa-solid fa-gear fa-3x"></i>
        </button>
      </div>
    </menu>
  )
}

export default Footer
