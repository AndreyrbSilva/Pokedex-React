import { useEffect, useState } from 'react'

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

export const COSMETIC_SUFFIXES = [
  // pikachu chapéus e cosplay
  'rock-star', 'belle', 'pop-star', 'phd', 'libre', 'cosplay',
  'original-cap', 'hoenn-cap', 'sinnoh-cap', 'unova-cap', 'kalos-cap',
  'alola-cap', 'partner-cap', 'starter', 'world-cap',

  // furfrou cortes
  'heart', 'star', 'diamond', 'debutante', 'matron', 'dandy',
  'la-reine', 'kabuki', 'pharaoh',

  // vivillon padrões
  'archipelago', 'continental', 'elegant', 'fancy', 'garden',
  'high-plains', 'icy-snow', 'jungle', 'marine', 'meadow',
  'modern', 'monsoon', 'ocean', 'polar', 'river', 'sandstorm',
  'savanna', 'sun', 'tundra', 'pokeball',

  // flabebe / floette / florges cores
  'red', 'yellow', 'orange', 'blue', 'white',

  // unown letras
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'exclamation', 'question',

  // burmy / wormadam
  'sandy', 'trash',

  // basculin
  'blue-striped',

  // genesect drives
  'burn', 'chill', 'douse', 'shock',

  // meloetta
  'pirouette',

  // castform
  'sunny', 'rainy', 'snowy',

  // rotom
  'heat', 'wash', 'frost', 'fan', 'mow',

  // spinda
  'spinda',

  // misc
  'totem', 'busted', 'disguised', 'own-tempo',
  'battle-bond', 'power-construct',
  'low-key', 'amped',
  'hangry', 'noice',
  'vanilla-cream', 'ruby-cream', 'matcha-cream', 'mint-cream',
  'lemon-cream', 'salted-cream', 'ruby-swirl', 'caramel-swirl', 'rainbow-swirl',
  'red-meteor', 'yellow-meteor', 'blue-meteor', 'green-meteor',
  'indigo-disk',
]

const FORM_LABELS: Record<string, string> = {
  'rock-star': 'Rock Star',
  'belle': 'Belle',
  'pop-star': 'Pop Star',
  'phd': 'PhD',
  'libre': 'Libre',
  'cosplay': 'Cosplay',
  'original-cap': 'Original Cap',
  'hoenn-cap': 'Hoenn Cap',
  'sinnoh-cap': 'Sinnoh Cap',
  'unova-cap': 'Unova Cap',
  'kalos-cap': 'Kalos Cap',
  'alola-cap': 'Alola Cap',
  'partner-cap': 'Partner Cap',
  'starter': 'Starter',
  'world-cap': 'World Cap',
  'totem': 'Totem',
  'busted': 'Busted',
  'disguised': 'Disguised',
  'own-tempo': 'Own Tempo',
  'battle-bond': 'Battle Bond',
  'power-construct': 'Power Construct',
}

function getSuffix(baseName: string, fullName: string): string | null {
  if (fullName === baseName) return null
  const suffix = fullName.replace(`${baseName}-`, '')
  return suffix || null
}

function getLabel(suffix: string): string {
  return FORM_LABELS[suffix] ?? suffix.replace(/-/g, ' ')
}

interface FormsTabProps {
  baseName: string
  varieties: Variety[]
  showShiny: boolean
  primaryColor: string
  onSpriteChange: (sprite: string | null, name: string | null) => void
}

function FormCard({
  name,
  label,
  showShiny,
  primaryColor,
  isActive,
  onSelect,
}: {
  name: string
  label: string
  showShiny: boolean
  primaryColor: string
  isActive: boolean
  onSelect: (sprite: string | null, name: string) => void
}) {
  const [data, setData] = useState<VariantData | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((r) => r.json())
      .then((d: VariantData) => { if (!cancelled) setData(d) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [name])

  const sprite = data
    ? (showShiny
        ? data.sprites.other['official-artwork'].front_shiny
        : data.sprites.other['official-artwork'].front_default)
    : null

  // quando o fetch termina e o card tá ativo, atualiza o sprite no pai
  useEffect(() => {
    if (isActive && sprite) {
      onSelect(sprite, name)
    }
  }, [sprite])

  function handleClick() {
    if (isActive) {
      onSelect(null, name)
    } else {
      onSelect(sprite, name)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer"
      style={{
        background: isActive ? `${primaryColor}15` : `${primaryColor}06`,
        borderColor: isActive ? `${primaryColor}55` : `${primaryColor}20`,
      }}
    >
      <div
        className="w-20 h-20 rounded-lg flex items-center justify-center"
        style={{ background: `${primaryColor}08` }}
      >
        {sprite ? (
          <img src={sprite} alt={name} className="w-16 h-16 object-contain" />
        ) : (
          <span className="text-white/20 text-xs font-body">...</span>
        )}
      </div>
      <span
        className="font-display text-[9px] capitalize text-center leading-tight"
        style={{ color: isActive ? primaryColor : `${primaryColor}99` }}
      >
        {label}
      </span>
    </div>
  )
}

export function FormsTab({ baseName, varieties, showShiny, primaryColor, onSpriteChange }: FormsTabProps) {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  const cosmetics = varieties
    .filter((v) => !v.is_default)
    .filter((v) => {
      const suffix = getSuffix(baseName, v.pokemon.name)
      return suffix !== null && COSMETIC_SUFFIXES.includes(suffix)
    })

  if (cosmetics.length === 0) return null

  function handleSelect(sprite: string | null, name: string) {
    if (activeForm === name) {
      setActiveForm(null)
      onSpriteChange(null, null)
    } else {
      setActiveForm(name)
      onSpriteChange(sprite, name)
    }
  }

  return (
    <div style={{ maxHeight: '320px', overflowY: 'auto' }} className="pr-1">
      <div className="grid grid-cols-3 gap-3">
        {cosmetics.map((v) => {
          const suffix = getSuffix(baseName, v.pokemon.name)!
          return (
            <FormCard
              key={v.pokemon.name}
              name={v.pokemon.name}
              label={getLabel(suffix)}
              showShiny={showShiny}
              primaryColor={primaryColor}
              isActive={activeForm === v.pokemon.name}
              onSelect={handleSelect}
            />
          )
        })}
      </div>
    </div>
  )
}
