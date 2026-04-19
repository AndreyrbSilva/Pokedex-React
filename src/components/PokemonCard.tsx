import { Link } from "react-router-dom"
import { usePokemon } from "../hooks/usePokemon"
import { usePokedexStore } from "../store/pokedexStore"
import { TYPE_COLORS } from "../types/pokemon"

export function PokemonCard({ id }: { id: number }) {
  const { pokemon, loading, error } = usePokemon(id)
  const { shinyMode, isFavorite, toggleFavorite } = usePokedexStore()

  const primaryType = pokemon?.types[0]?.type.name ?? "normal"
  const color = TYPE_COLORS[primaryType] ?? "#A8A77A"

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
        <p>Pokémon não encontrado</p>
      </div>
    )
  }

  const fav = isFavorite(pokemon.id)

  return (
    <div
      className="group relative bg-base-card rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_10px_var(--pokemon-color)]"
      style={
        {
          "--pokemon-color": `${color}66`,
          borderColor: `${color}44`,
        } as React.CSSProperties
      }
    >
      {/* link cobre o card inteiro */}
      <Link to={`/pokemon/${pokemon.id}`} className="absolute inset-0 z-[1]" />

      {/* botão favorito acima do link */}
      <button
        onClick={() => toggleFavorite(pokemon.id)}
        className="absolute top-2 right-2 z-10 text-lg transition-transform hover:scale-125"
        style={{ color: fav ? '#FFD700' : 'rgba(255,255,255,0.2)' }}
      >
        {fav ? '★' : '☆'}
      </button>

      {/* fundo com gradiente */}
      <div
        className="flex items-center justify-center p-4 h-36"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${color}33 0%, transparent 70%)`,
        }}
      >
        <img
          src={
            shinyMode
              ? pokemon.sprites.other["official-artwork"].front_shiny
              : pokemon.sprites.other["official-artwork"].front_default
          }
          alt={pokemon.name}
          className="h-20 w-20 sm:h-28 sm:w-28 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-3">
        <p
          className="font-body text-xs mb-1"
          style={{ color: `${color}99` }}
        >
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        <h3 className="font-body text-xs sm:text-sm capitalize text-white mb-2">
          {pokemon.name}
        </h3>
        <div className="flex gap-1 flex-wrap">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="px-2 py-1 text-xs rounded-full border capitalize"
              style={{
                color: TYPE_COLORS[typeInfo.type.name],
                borderColor: `${TYPE_COLORS[typeInfo.type.name]}55`,
                background: `${TYPE_COLORS[typeInfo.type.name]}15`,
              }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard