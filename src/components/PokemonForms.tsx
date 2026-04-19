import { useEffect, useState } from 'react'
import { COSMETIC_SUFFIXES } from './FormsTab'

interface Variety {
  is_default: boolean
  pokemon: { name: string; url: string }
}

interface VariantData {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null
        front_shiny: string | null
      }
    }
  }
}

const FORM_LABELS: Record<string, string> = {
  'mega': 'Mega',
  'mega-x': 'Mega X',
  'mega-y': 'Mega Y',
  'gmax': 'Gigantamax',
  'alola': 'Alola',
  'galar': 'Galar',
  'hisui': 'Hisui',
  'paldea': 'Paldea',
  'origin': 'Origin',
  'sky': 'Sky',
  'therian': 'Therian',
  'black': 'Black',
  'white': 'White',
  'resolute': 'Resolute',
  'pirouette': 'Pirouette',
  'ash': 'Ash',
  'school': 'School',
  'dusk': 'Dusk',
  'dawn': 'Dawn',
  'ultra': 'Ultra',
  'eternamax': 'Eternamax',
  'crowned': 'Crowned',
  'hangry': 'Hangry',
  'noice': 'Noice',
  'rapid-strike': 'Rapid Strike',
  'single-strike': 'Single Strike',
}

function getSuffix(baseName: string, fullName: string): string | null {
  if (fullName === baseName) return null
  const suffix = fullName.replace(`${baseName}-`, '')
  return suffix || null
}

function getLabel(suffix: string): string {
  return FORM_LABELS[suffix] ?? suffix.replace(/-/g, ' ')
}

interface PokemonFormsProps {
  baseName: string
  varieties: Variety[]
  showShiny: boolean
  primaryColor: string
  onSpriteChange: (sprite: string | null, name: string | null, id: number | null) => void
}

export function PokemonForms({ baseName, varieties, showShiny, primaryColor, onSpriteChange }: PokemonFormsProps) {
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const [cache, setCache] = useState<Record<string, VariantData>>({})

  useEffect(() => {
    setActiveForm(null)
    setCache({})
    onSpriteChange(null, null, null)
  }, [baseName])

  useEffect(() => {
    if (!activeForm || !cache[activeForm]) return
    const sprite = showShiny
      ? cache[activeForm].sprites.other['official-artwork'].front_shiny
      : cache[activeForm].sprites.other['official-artwork'].front_default
    onSpriteChange(sprite, cache[activeForm].name, cache[activeForm].id)
  }, [showShiny])

  const altForms = varieties
    .filter((v) => !v.is_default)
    .filter((v) => {
      const suffix = getSuffix(baseName, v.pokemon.name)
      if (!suffix) return false
      if (COSMETIC_SUFFIXES.includes(suffix)) return false
      return true
    })

  if (altForms.length === 0) return null

  async function handleSelect(name: string) {
    if (activeForm === name) {
      setActiveForm(null)
      onSpriteChange(null, null, null)
      return
    }

    setActiveForm(name)

    if (cache[name]) {
      const sprite = showShiny
        ? cache[name].sprites.other['official-artwork'].front_shiny
        : cache[name].sprites.other['official-artwork'].front_default
      onSpriteChange(sprite, cache[name].name, cache[name].id)
      return
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data: VariantData = await res.json()
      setCache((prev) => ({ ...prev, [name]: data }))
      const sprite = showShiny
        ? data.sprites.other['official-artwork'].front_shiny
        : data.sprites.other['official-artwork'].front_default
      onSpriteChange(sprite, data.name, data.id)
    } catch {
      onSpriteChange(null, null, null)
    }
  }

  return (
    <div className="absolute -top-[30px] left-[16px] flex flex-row gap-0 z-0">
      {altForms.map((v) => {
        const isActive = activeForm === v.pokemon.name
        return (
          <button
            key={v.pokemon.name}
            onClick={() => handleSelect(v.pokemon.name)}
            className="font-display text-[8px] px-3 py-2 transition-all"
            style={
              isActive
                ? {
                    color: primaryColor,
                    background: '#0a0a0f',
                    border: `1px solid ${primaryColor}66`,
                    borderBottom: 'none',
                    borderRadius: '6px 6px 0 0',
                  }
                : {
                    color: 'rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderBottom: 'none',
                    borderRadius: '6px 6px 0 0',
                  }
            }
          >
            {getLabel(getSuffix(baseName, v.pokemon.name)!).toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}