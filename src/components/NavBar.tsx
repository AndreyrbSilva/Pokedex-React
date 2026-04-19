import { Link, useLocation } from "react-router-dom";
import { usePokedexStore } from '../store/pokedexStore'

export function NavBar() {
  const { shinyMode, toggleShinyMode } = usePokedexStore()
  const { pathname } = useLocation()

  return (
    <>
      {/* Top bar */}
      <nav className="sticky top-0 flex items-center justify-between px-6 py-4 bg-base-bg/90 border-b border-base-border backdrop-blur-md z-50">
        <Link className="no-underline font-display text-xss text-neon-green" to="/">
          Pokédex
        </Link>

        <div className="flex items-center gap-4">
          {/* Links só aparecem no desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className={`font-body text-sm transition-colors ${pathname === '/' ? 'text-neon-green' : 'text-white/40 hover:text-white'}`}
            >
              &gt; Inicio
            </Link>
            <Link
              to="/favorites"
              className={`font-body text-sm transition-colors ${pathname === '/favorites' ? 'text-neon-green' : 'text-white/40 hover:text-white'}`}
            >
              &gt; Favoritos
            </Link>
          </div>

          <button
            onClick={toggleShinyMode}
            className={`font-body text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
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

      {/* Bottom nav — só mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3 border-t border-base-border bg-base-bg/95 backdrop-blur-md">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/' ? 'text-neon-green' : 'text-white/30'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="font-body text-[10px]">Início</span>
        </Link>

        <Link
          to="/favorites"
          className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/favorites' ? 'text-neon-green' : 'text-white/30'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={pathname === '/favorites' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="font-body text-[10px]">Favoritos</span>
        </Link>
      </nav>
    </>
  )
}

export default NavBar;
