import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../../index.css";
import { Decks, Play, Statistics, Settings, Cards } from "../../pages/index.js";
import { Menu } from "../componentsImport.js";

function App() {
  return (
    <Router>
      <main className="text-black md:bg-purple-500 max-w-screen-md w-full min-h-screen mx-auto pb-24 flex flex-col justify-between relative">
        <Routes>
          <Route path="/" element={<Navigate to="/decks" />} />
          <Route path="/play" element={<Play />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/decks/:deckId/cards" element={<Cards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Menu />
      </main>
    </Router>
  );
}

export default App;
