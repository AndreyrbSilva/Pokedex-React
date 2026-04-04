import PokemonCard from "../components/PokemonCard"
import { usePokemonList, usePokemonByType } from "../hooks/usePokemon"
import { usePokedexStore } from '../store/pokedexStore'
import TypeFilter from "../components/TypeFilter"

export function HomePage() {
  const { currentPage, setCurrentPage, selectedType } = usePokedexStore()
  const { list, total, loading } = usePokemonList(currentPage * 24, 24)
  const { ids, loading: typeLoading } = usePokemonByType(selectedType)
  const displayIds = selectedType
  ? ids.slice(currentPage * 24, (currentPage + 1) * 24)
  : list.map((p) => parseInt(p.url.split('/').filter(Boolean).pop()!))
  const totalItems = selectedType ? ids.length : Math.min(total, 1025)

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pokédex</h1>
      <form className="mb-4">
        <input type="text" placeholder="Procure por nome ou ID" className="mb-4 p-2 border rounded w-full" />              
        <submit className="px-4 py-2 bg-blue-500 text-white rounded">Search</submit>                   
      </form>
      <TypeFilter />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayIds.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage(0)}>«</button>
        )}

        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          &lt;
        </button>

        <span className="mx-4">
          Page {currentPage + 1} of {Math.ceil(totalItems / 24)}
        </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={(currentPage + 1) * 24 >= totalItems}
        >
          &gt;
        </button>

        <button onClick={() => setCurrentPage(Math.ceil(totalItems / 24) - 1)}>»</button>
      </div>
    </div>
  )
}

export default HomePage