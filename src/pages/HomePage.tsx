import PokemonCard from "../components/PokemonCard"
import { usePokemon, usePokemonList, usePokemonByType } from "../hooks/usePokemon"
import { usePokedexStore } from '../store/pokedexStore'
import TypeFilter from "../components/TypeFilter"
import { useState } from "react"

function SearchResult({ search }: { search: string }) {
  const { pokemon, loading, error } = usePokemon(search.toLowerCase().trim())

  if (loading) return (
    <p className="font-body text-xs text-white/30 col-span-6 text-center mt-8">Buscando...</p>
  )
  if (error || !pokemon) return (
    <p className="font-body text-xs text-neon-red col-span-6 text-center mt-8">Pokémon não encontrado</p>
  )
  return <PokemonCard key={pokemon.id} id={pokemon.id} />
}

export function HomePage() {
  const { currentPage, setCurrentPage, selectedType } = usePokedexStore()
  const { list, total, loading } = usePokemonList(currentPage * 24, 24)
  const { ids, loading: typeLoading } = usePokemonByType(selectedType)

  const displayIds = selectedType
    ? ids.slice(currentPage * 24, (currentPage + 1) * 24)
    : list.map((p) => parseInt(p.url.split('/').filter(Boolean).pop()!))

  const totalItems = selectedType ? ids.length : Math.min(total, 1025)

  const [search, setSearch] = useState('')

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 z-0">

      <h1 className="font-display text-neon-green text-sm mb-6 text-center">Buscar Pokemon</h1>

      <div className="mb-6 flex justify-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Procure por nome ou ID..."
          className="w-full max-w-lg bg-base-card border border-base-border rounded-full px-6 py-3 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-green/50 transition-colors"
        />
      </div>

      <TypeFilter />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {search ? (
          <SearchResult search={search} />
        ) : (
          displayIds.map((id) => (
            <PokemonCard key={id} id={id} />
          ))
        )}
      </div>

      {/* paginação */}
      {!search && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(0)}
              className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 hover:border-white/40 transition-all"
            >«</button>
          )}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 disabled:opacity-20 transition-all"
          >&lt;</button>
          <span className="font-body text-xs text-white/60 mx-2">
            {currentPage + 1} / {Math.ceil(totalItems / 24)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(currentPage + 1) * 24 >= totalItems}
            className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 disabled:opacity-20 transition-all"
          >&gt;</button>
          <button
            onClick={() => setCurrentPage(Math.ceil(totalItems / 24) - 1)}
            className="font-display text-xs px-3 py-2 rounded border border-base-border text-white/30 hover:text-white/70 transition-all"
          >»</button>
        </div>
      )}

    </div>
  )
}

export default HomePage