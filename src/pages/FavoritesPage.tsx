import { usePokedexStore } from '../store/pokedexStore'
import PokemonCard from '../components/PokemonCard'

function FavoritesPage() {
  const { favorites } = usePokedexStore()

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        {favorites.map((id) => (
          <PokemonCard key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage;