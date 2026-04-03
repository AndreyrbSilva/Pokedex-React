import PokemonCard from "../components/PokemonCard"
import { usePokemonList } from "../hooks/usePokemon"
import { usePokedexStore } from '../store/pokedexStore'

export function HomePage() {
  const { currentPage, setCurrentPage } = usePokedexStore()
  const { list, total, loading } = usePokemonList(currentPage * 24, 24)

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pokédex</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.map((pokemon) => {
          const id = pokemon.url.split("/")[6]

          return <PokemonCard key={id} id={Number(id)} />
        })}
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
          Page {currentPage + 1} of {Math.ceil(total / 24)}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={(currentPage + 1) * 24 >= total}
        >
          &gt;
        </button>
        <button onClick={() => setCurrentPage(Math.ceil(total / 24) - 1)}>»</button>
      </div>
    </div>
  )
}

export default HomePage