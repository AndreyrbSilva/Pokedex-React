import { useState, useEffect } from 'react'
import type { Pokemon, PokemonSpecies } from '../types/pokemon'

const FORM_FALLBACKS = [
  '-normal', '-altered', '-land', '-incarnate', '-standard',
  '-red-striped', '-plant', '-shield', '-aria', '-average',
]

export function usePokemon(idOrName: number | string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (idOrName === '' || idOrName === undefined) return

    const tryFetch = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
      if (res.ok) return res.json()

      for (const suffix of FORM_FALLBACKS) {
        const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}${suffix}`)
        if (r.ok) return r.json()
      }
      throw new Error('Pokémon não encontrado')
    }

    setLoading(true)
    setError(null)
    setPokemon(null)
    tryFetch()
      .then((data) => { setPokemon(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [idOrName])

  return { pokemon, loading, error }
}

export function usePokemonSpecies(idOrName: number | string) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`)
      .then((res) => {
        if (!res.ok) throw new Error('Espécie não encontrada')
        return res.json()
      })
      .then((data) => { setSpecies(data); setLoading(false) })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [idOrName])

  return { species, loading, error }
}

export function usePokemonList(offset: number, limit: number) {
  const safeOffset = Math.min(offset, 1025)
  const safeLimit = Math.min(limit, 1025 - safeOffset)
  const [list, setList] = useState<{ name: string; url: string }[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${safeOffset}&limit=${safeLimit}`)
      .then(data => data.json())
      .then(data => { setList(data.results); setTotal(data.count); setLoading(false) })
  }, [offset, limit])

  return { list, total, loading }
}

export function usePokemonByType(type: string) {
  const [ids, setIds] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((res) => {
        if (!res.ok) throw new Error('Tipo não encontrado')
        return res.json()
      })
      .then((data) => {
        const ids = data.pokemon
          .map((p: any) => parseInt(p.pokemon.url.split('/').filter(Boolean).pop()))
          .filter((id: number) => id <= 1025)
        setIds(ids)
        setLoading(false)
      })
      .catch((err) => { setError(err.message); setLoading(false) })
  }, [type])

  return { ids, loading, error }
}

export function useMove(name: string) {
  const [move, setMove] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!name) return
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/move/${name}`)
      .then((res) => res.json())
      .then((data) => { setMove(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [name])

  return { move, loading }
}