import PokemonCard from "../components/PokemonCard"
import { usePokemonList, usePokemonByType, useAllPokemon } from "../hooks/usePokemon"
import { usePokedexStore } from '../store/pokedexStore'
import TypeFilter from "../components/TypeFilter"
import { useState } from "react"

export function HomePage() {
  const { currentPage, setCurrentPage, selectedType } = usePokedexStore()

  const { list, total, loading } = usePokemonList(currentPage * 24, 24)
  const { ids, loading: typeLoading } = usePokemonByType(selectedType)
  const { list: allPokemon, loading: allLoading } = useAllPokemon()

  const [search, setSearch] = useState('')

  const filtered = allPokemon.filter((p) => {
    const name = p.name.toLowerCase()
    const q = search.toLowerCase().trim()

    return name.startsWith(q) || name.includes(q)
  })

  const filteredIds = filtered.map((p) =>
    parseInt(p.url.split('/').filter(Boolean).pop()!)
  )

  const displayIds = selectedType
    ? ids.slice(currentPage * 24, (currentPage + 1) * 24)
    : list.map((p) => parseInt(p.url.split('/').filter(Boolean).pop()!))

  const totalItems = selectedType ? ids.length : Math.min(total, 1025)

  if (loading || typeLoading || allLoading) return <p>Loading...</p>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-28 md:pb-8 z-0">

      <h1 className="font-display text-neon-green text-sm mb-6 text-center">
        Buscar Pokemon
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(0)
          }}
          placeholder="Procure por nome ou ID..."
          className="w-full max-w-lg bg-base-card border border-base-border rounded-full px-6 py-3 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-green/50 transition-colors"
        />
      </div>

      <TypeFilter />

      {/* paginação só sem busca */}
      {!search && (
        <div className="flex items-center justify-center gap-2 mt-6 mb-6">
          {currentPage > 0 && (
            <button onClick={() => setCurrentPage(0)} className="btn">«</button>
          )}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="btn"
          >&lt;</button>

          <span className="font-body text-xs text-white/60 mx-2">
            {currentPage + 1} / {Math.ceil(totalItems / 24)}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(currentPage + 1) * 24 >= totalItems}
            className="btn"
          >&gt;</button>

          <button
            onClick={() => setCurrentPage(Math.ceil(totalItems / 24) - 1)}
            className="btn"
          >»</button>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {search ? (
          filteredIds.length > 0 ? (
            filteredIds.slice(0, 24).map((id) => (
              <PokemonCard key={id} id={id} />
            ))
          ) : (
            <p className="col-span-6 text-center text-white/40 text-xs">
              Nenhum Pokémon encontrado
            </p>
          )
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
            <button onClick={() => setCurrentPage(0)} className="btn">«</button>
          )}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="btn"
          >&lt;</button>

          <span className="font-body text-xs text-white/60 mx-2">
            {currentPage + 1} / {Math.ceil(totalItems / 24)}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={(currentPage + 1) * 24 >= totalItems}
            className="btn"
          >&gt;</button>

          <button
            onClick={() => setCurrentPage(Math.ceil(totalItems / 24) - 1)}
            className="btn"
          >»</button>
        </div>
      )}

    </div>
  )
}

export default HomePage