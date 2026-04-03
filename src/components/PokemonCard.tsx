import { Link } from "react-router-dom"
import { usePokemon } from "../hooks/usePokemon"

export function PokemonCard({ id }: { id: number }) {
  const { pokemon, loading, error } = usePokemon(id)

  if (loading) {
    return (
      <div className="pokemon-card">
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-card">
        <p>Error loading Pokémon</p>
      </div>
    )
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="pokemon-card">

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />

        <p className="text-sm text-gray-400">
          #{String(pokemon.id).padStart(3, "0")}
        </p>

        <h3 className="capitalize">{pokemon.name}</h3>

        <div className="flex gap-2 mt-2">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="px-2 py-1 text-xs bg-gray-700 rounded capitalize"
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

      </div>
    </Link>
  )
}

export default PokemonCard