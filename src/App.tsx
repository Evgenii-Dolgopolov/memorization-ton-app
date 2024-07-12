import React from "react"
import "./styles/App.css"
import { DeckTab, Footer, Learn, Statistics, Settings } from "./pages/index"

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState<string>("DeckTab")

  return (
    <main className="text-black md:bg-purple-500 max-w-screen-md mx-auto pb-24 min-h-screen w-full flex flex-col justify-between relative">
      {currentTab === "Learn" && <Learn />}
      {currentTab === "DeckTab" && <DeckTab />}
      {currentTab === "Statistics" && <Statistics />}
      {currentTab === "Settings" && <Settings />}
      <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </main>
  )
}

export default App
