import React from "react"
import "./styles/App.css"
import { DeckTab, Footer, Learn, Statistics, Settings } from "./pages/index"

type Tab = "Learn" | "DeckTab" | "Statistics" | "Settings"

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState<Tab>("DeckTab")

  return (
    <main className="text-black md:bg-purple-500 max-w-screen-md w-full min-h-screen mx-auto pb-24 flex flex-col justify-between relative">
      {currentTab === "Learn" && <Learn />}
      {currentTab === "DeckTab" && <DeckTab />}
      {currentTab === "Statistics" && <Statistics />}
      {currentTab === "Settings" && <Settings />}
      <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </main>
  )
}

export default App
