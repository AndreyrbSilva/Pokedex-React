import { Link } from "react-router-dom";
import { usePokedexStore } from '../store/pokedexStore'

export function NavBar() {
    const { shinyMode, toggleShinyMode } = usePokedexStore()

    return (
        <>
            <nav className="sticky top-0 flex items-center justify-between px-6 py-4 bg-gray-900">
                <div className="">
                    <Link className="text-white no-underline" to="/">Pokedex</Link>
                </div>
                <div className="flex gap-4">
                    <Link to="/favorites">Favorites</Link>
                    <button className={shinyMode 
                    ? "px-4 py-1 rounded bg-yellow-400 text-black font-semibold transition"
                    : "px-4 py-1 rounded bg-gray-700 text-white transition"}
                    onClick={toggleShinyMode}>
                        Shiny
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar;