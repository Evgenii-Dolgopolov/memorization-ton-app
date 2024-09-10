import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../../index.css";
import {
  Decks,
  Play,
  Settings,
  Cards,
  NextCard,
} from "../../pages/pagesImport.js";
import { DeletePopup, Menu } from "../componentsImport.js";
import { PopupsProvider } from "../../utils/context/PopupsContext.jsx";
import { DecksProvider } from "../../utils/context/DecksContext.jsx";

function App() {
  return (
    <Router>
      <PopupsProvider>
        <DecksProvider>
          <main className="text-black md:bg-purple-500 max-w-screen-md w-full min-h-screen mx-auto pb-24 flex flex-col justify-between relative">
            <Routes>
              <Route path="/" element={<Navigate to="/decks" />} />
              <Route path="/play" element={<Play />} />
              <Route path="/cards/next/:deckId" element={<NextCard />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/decks/:deckId/cards" element={<Cards />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <Menu />
            <DeletePopup />
          </main>
        </DecksProvider>
      </PopupsProvider>
    </Router>
  );
}

export default App;
