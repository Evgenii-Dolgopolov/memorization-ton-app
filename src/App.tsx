import React from "react"
import "./styles/App.css"
import { Deck, Footer, Learn, Statistics, Settings } from "./pages/index"

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState<string>("Deck")

  return (
    <main className="text-black md:bg-purple-500 max-w-screen-md mx-auto pb-24 min-h-screen w-full flex flex-col justify-between relative">
      {currentTab === "Learn" && <Learn />}
      {currentTab === "Deck" && <Deck />}
      {currentTab === "Statistics" && <Statistics />}
      {currentTab === "Settings" && <Settings />}
      <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </main>
  )
}

export default App
