import { useParams } from 'react-router-dom'
import { usePokemon } from "../hooks/usePokemon"
import { usePokedexStore } from '../store/pokedexStore'

function PokemonDetailPage() {
    const { id } = useParams()
    const { pokemon, loading, error } = usePokemon(id ?? '')
    const { isFavorite, toggleFavorite } = usePokedexStore()
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!pokemon) return <p>Pokémon não encontrado</p>
    const fav = isFavorite(pokemon.id)

    return  (
        <div>
            <p><a href="/">Voltar</a></p>
            <h1>Pokemon Detail</h1>
            <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            <p>Favorite: <button onClick={() => toggleFavorite(pokemon.id)}>{fav ? 'Unfavorite' : 'Favorite'}</button></p>
            <p>Number: {pokemon.id}</p>
            <p>Types: {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.type.name}>{typeInfo.type.name}</span>
            ))}</p>
            <p>Stats: {pokemon.stats.map((statInfo) => (
                <span key={statInfo.stat.name}>{statInfo.stat.name}: {statInfo.base_stat}</span>
            ))}</p>
            <p>Abilities: {pokemon.abilities.map((abilityInfo) => (
                <span key={abilityInfo.ability.name}>{abilityInfo.ability.name}</span>
            ))}</p>
            <div>
                <p>Pokemon anterior</p>
                <p>proximo pokemon</p>
            </div>
        </div>
    )
}

export default PokemonDetailPage;