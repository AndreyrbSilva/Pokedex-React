import { useParams } from 'react-router-dom'
import { usePokemon } from "../hooks/usePokemon"

function PokemonDetailPage() {
    const { id } = useParams()
    const { pokemon, loading, error } = usePokemon(id ?? '')
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!pokemon) return <p>Pokémon não encontrado</p>

    return  (
        <div>
            <h1>Pokemon Detail</h1>
            <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            <p>Number: {pokemon.id}</p>
        </div>
    )
}

export default PokemonDetailPage;