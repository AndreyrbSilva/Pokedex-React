import { Link } from "react-router-dom";
import { usePokedexStore } from '../store/pokedexStore'

export function NavBar() {
    const { shinyMode, toggleShinyMode } = usePokedexStore()

    return (
        <>
            <nav className="sticky top-0 flex items-center justify-between px-6 py-4 bg-base-bg/90 border-b border-base-border backdrop-blur-md z-50">
                <div className="flex items-center gap-4">
                    <Link className="no-underline font-display text-xss text-neon-green" to="/">Pokédex</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="font-body text-white/40 hover:text-white transition-colors">&gt; Inicio</Link>
                    <Link to="/favorites" className="font-body text-white/40 hover:text-white transition-colors">&gt; Favoritos</Link>
                    <button
                        onClick={toggleShinyMode}
                        className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
                        shinyMode
                            ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                            : 'border-white/20 text-white/60 hover:border-white/70 hover:text-white/70'
                        }`}
                        title="Alternar modo shiny"
                    >
                        🌟 Shiny
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar;