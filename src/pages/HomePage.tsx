import PokemonCard from "../components/PokemonCard"
import { usePokemonList } from "../hooks/usePokemon"

export function HomePage() {
  const { list, total, loading } = usePokemonList(0, 24)

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
    </div>
  )
}

export default HomePage