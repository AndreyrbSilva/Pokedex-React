import { useState, useEffect } from 'react'
import type { Pokemon, PokemonSpecies } from '../types/pokemon'

export function usePokemon( idOrName: number | string ){
    const[pokemon, setPokemon] = useState<Pokemon | null>(null)
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState<string | null>(null)

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
      .then((res) => {
        if (!res.ok) throw new Error('Pokémon não encontrado')
        return res.json()
      })
      .then((data) => {
        setPokemon(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [idOrName]) // roda de novo sempre que o id mudar

  return { pokemon, loading, error }
}

export function usePokemonSpecies( idOrName: number | string ){
    const[species, setSpecies] = useState<PokemonSpecies | null>(null)
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState<string | null>(null)

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`)
      .then((res) => {
        if (!res.ok) throw new Error('Espécie não encontrada')
        return res.json()
      })
      .then((data) => {
        setSpecies(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [idOrName]) // roda de novo sempre que o id mudar

  return { species, loading, error };
}

export function usePokemonList( offset: number, limit: number ){
    const[list, setList] = useState<{ name: string; url: string }[]>([])
    const[total, setTotal] = useState(0)
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
          .then(data => data.json())
            .then(data => {
                setList(data.results)
                setTotal(data.count)
                setLoading(false)
            })
    }, [offset, limit])

    return { list, total, loading };
}

export function usePokemonByType( type: string ){
    const [ids, setIds] = useState<number[]>([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState<string | null>(null)

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((res) => {
        if (!res.ok) throw new Error('Tipo não encontrado')
        return res.json()
      })
      .then((data) => {
        const ids = data.pokemon.map((p: any) =>
          parseInt(p.pokemon.url.split('/').filter(Boolean).pop())
        )
        setIds(ids)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [type])

  return { ids, loading, error }
}
