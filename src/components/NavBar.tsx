import { Link } from "react-router-dom";
import { usePokedexStore } from '../store/pokedexStore'

export function NavBar() {
    const { shinyMode, toggleShinyMode } = usePokedexStore()

    return (
        <>
            <nav className="sticky top-0 flex items-center justify-between px-6 py-4 bg-base-bg/90 border-b border-base-border backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <Link className="no-underline font-display text-xs text-neon-green" to="/">Pokédex</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/favorites" className="font-body text-white/60 hover:text-white transition-colors">Favorites</Link>
                    <button className={shinyMode 
                    ? "px-4 py-1 rounded bg-yellow-400 text-black font-semibold transition"
                    : "px-4 py-1 rounded border border-base-border text-white/40 text-white transition"}
                    onClick={toggleShinyMode}>
                        Shiny
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar;