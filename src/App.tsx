import React from "react"
import "./styles/App.css"

import { Home, Footer } from "./pages/index"

function App() {
  return (
    <main className="bg-white md:bg-purple-500 md:w-[1024px] mx-auto h-screen flex flex-col justify-between">
      <Home />
      <Footer />
    </main>
  )
}

export default App
