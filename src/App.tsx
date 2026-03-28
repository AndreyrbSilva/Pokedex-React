import { BrowserRouter, Route, Routes } from "react-router-dom"
import FavoritesPage from "./pages/FavoritesPage.tsx"
import HomePage from "./pages/HomePage.tsx"
import PokemonDetailPage from "./pages/PokemonDetailPage.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
