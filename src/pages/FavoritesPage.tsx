import PokemonCard from "../components/PokemonCard"
import { usePokedexStore } from '../store/pokedexStore'
import TypeFilter from "../components/TypeFilter"
import { usePokemon } from "../hooks/usePokemon"
import { useState, useEffect } from "react"

function FavoriteCard({ id, search, selectedType }: { id: number; search: string; selectedType: string }) {
  const { pokemon } = usePokemon(id)

  if (!pokemon) return null

  if (search) {
    const q = search.toLowerCase().trim()
    const matchName = pokemon.name.includes(q)
    const matchId = String(pokemon.id).includes(q)
    if (!matchName && !matchId) return null
  }

  if (selectedType) {
    const hasType = pokemon.types.some((t) => t.type.name === selectedType)
    if (!hasType) return null
  }

  return <PokemonCard id={id} />
}

const ITEMS_PER_PAGE = 24

function FavoritesPage() {
  const { favorites, selectedType } = usePokedexStore()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => setCurrentPage(0), [search, selectedType])

  const visibleFavorites = favorites.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">

        <h1 className="font-display text-neon-green text-sm mb-6 text-center">Meus Favoritos</h1>

        <div className="mb-6 flex justify-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procure por nome ou ID..."
            className="w-full max-w-lg bg-base-card border border-base-border rounded-full px-6 py-3 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-green/50 transition-colors"
          />
        </div>

        <TypeFilter />

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <span className="text-5xl">☆</span>
            <p className="font-body text-xs text-white/30 text-center">
              Você ainda não favoritou nenhum pokémon.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {visibleFavorites.map((id) => (
                <FavoriteCard
                  key={id}
                  id={id}
                  search={search}
                  selectedType={selectedType}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(0)}
                  disabled={currentPage === 0}
                  className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 disabled:opacity-20 transition-all"
                >«</button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 disabled:opacity-20 transition-all"
                >&lt;</button>
                <span className="font-body text-xs text-white/60 mx-2">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage + 1 >= totalPages}
                  className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 disabled:opacity-20 transition-all"
                >&gt;</button>
                <button
                  onClick={() => setCurrentPage(totalPages - 1)}
                  disabled={currentPage + 1 >= totalPages}
                  className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 disabled:opacity-20 transition-all"
                >»</button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default FavoritesPage