import React from "react"

interface FooterProps {
  setCurrentTab: (tab: string) => void
}

const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)

    // Add the class immediately to the <i> element
    const iconElement = document.querySelector(`#${tab}Button i`)
    if (iconElement) {
      iconElement.classList.add("fa-bounce")

      // Remove the class after 2 seconds
      setTimeout(() => {
        iconElement.classList.remove("fa-bounce")
      }, 750)
    }
  }

  return (
    <menu className="fixed bottom-0 w-full h-1/6 bg-white shadow-lg">
      <div className="h-full flex m-auto justify-around">
        <button
          id="LearnButton"
          onClick={() => handleTabChange("Learn")}
          className="w-full border-2 border-none">
          <i className="fa-solid fa-brain fa-3x"></i>
        </button>
        <button
          id="DeckButton"
          onClick={() => handleTabChange("Deck")}
          className="w-full border-2 border-none">
          <i className="fa-solid fa-layer-group fa-3x"></i>
        </button>
        <button
          id="StatisticsButton"
          onClick={() => handleTabChange("Statistics")}
          className="w-full border-2 border-none">
          <i className="fa-solid fa-chart-simple fa-3x"></i>
        </button>
        <button
          id="SettingsButton"
          onClick={() => handleTabChange("Settings")}
          className="w-full border-2 border-none">
          <i className="fa-solid fa-gear fa-3x"></i>
        </button>
      </div>
    </menu>
  )
}

export default Footer
