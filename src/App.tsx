import React from "react"
import "./styles/App.css"
import { Deck, Footer, Learn, Statistics, Settings } from "./pages/index"

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState<string>("Deck")

  return (
    <main className="text-black md:bg-purple-500 md:w-[1024px] mx-auto pb-24 h-full flex flex-col justify-between">
      {currentTab === "Learn" && <Learn />}
      {currentTab === "Deck" && <Deck />}
      {currentTab === "Statistics" && <Statistics />}
      {currentTab === "Settings" && <Settings />}
      <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </main>
  )
}

export default App
