import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface ChainLink {
  species: { name: string; url: string }
  evolution_details: {
    min_level: number | null
    item: { name: string } | null
    trigger: { name: string }
  }[]
  evolves_to: ChainLink[]
}

interface EvolutionChainData {
  chain: ChainLink
}

interface EvoStep {
  name: string
  id: number
  trigger: string | null
  minLevel: number | null
  item: string | null
}

function parseChain(link: ChainLink, trigger: string | null = null, minLevel: number | null = null, item: string | null = null): EvoStep[][] {
  const id = parseInt(link.species.url.split('/').filter(Boolean).pop()!)
  const current: EvoStep = { name: link.species.name, id, trigger, minLevel, item }

  if (link.evolves_to.length === 0) return [[current]]

  return link.evolves_to.flatMap((next) => {
    const detail = next.evolution_details[0]
    const paths = parseChain(
      next,
      detail?.trigger?.name ?? null,
      detail?.min_level ?? null,
      detail?.item?.name ?? null
    )
    return paths.map((path) => [current, ...path])
  })
}

function EvoPokemon({ step, showShiny, activeFormSuffix }: {
  step: EvoStep
  showShiny: boolean
  activeFormSuffix: string | null
}) {
  const [formSprite, setFormSprite] = useState<string | null>(null)

  useEffect(() => {
    if (!activeFormSuffix) {
      setFormSprite(null)
      return
    }

    // tenta buscar a forma regional/alternativa desse step
    const tryName = `${step.name}-${activeFormSuffix}`
    fetch(`https://pokeapi.co/api/v2/pokemon/${tryName}`)
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data) => {
        const s = showShiny
          ? data.sprites.other['official-artwork'].front_shiny
          : data.sprites.other['official-artwork'].front_default
        setFormSprite(s)
      })
      .catch(() => setFormSprite(null)) // se não tiver forma, usa sprite normal
  }, [activeFormSuffix, showShiny, step.name])

  const defaultSprite = showShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${step.id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png`

  const sprite = formSprite ?? defaultSprite

  return (
    <Link to={`/pokemon/${step.id}`} className="flex flex-col items-center gap-2 group">
      <div
        className="w-24 h-24 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <img src={sprite} alt={step.name} className="w-20 h-20 object-contain" />
      </div>
      <span className="font-body text-[9px] text-white/25">
        #{String(step.id).padStart(4, '0')}
      </span>
      <span className="font-display text-[11px] capitalize text-white/60 group-hover:text-white/90 transition-colors">
        {step.name.replace(/-/g, ' ')}
      </span>
    </Link>
  )
}

function EvoArrow({ step }: { step: EvoStep }) {
  const label =
    step.minLevel ? `Lv. ${step.minLevel}`
    : step.item ? step.item.replace(/-/g, ' ')
    : step.trigger === 'trade' ? 'Trade'
    : step.trigger === 'use-item' ? (step.item ?? 'Item')
    : '—'

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-3">
      <span className="font-display text-[9px] text-white/30 capitalize tracking-wider">{label}</span>
      <span className="text-white/20 text-lg">→</span>
    </div>
  )
}

export function EvolutionChain({ chainUrl, primaryColor, showShiny, activeFormSuffix }: {
  chainUrl: string
  primaryColor: string
  showShiny: boolean
  activeFormId: number | null
  baseId: number
  activeFormSuffix: string | null
}) {
  const [paths, setPaths] = useState<EvoStep[][]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(chainUrl)
      .then((r) => r.json())
      .then((data: EvolutionChainData) => {
        setPaths(parseChain(data.chain))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [chainUrl])

  if (loading) return <p className="font-body text-xs text-white/30 text-center py-4">Carregando evoluções...</p>
  if (!paths.length) return null
  if (paths.length === 1 && paths[0].length === 1) return null

  return (
    <div className="mt-8">
      <h2
        className="font-display text-[9px] mb-4 tracking-widest"
        style={{ color: `${primaryColor}70` }}
      >
        EVOLUTION CHAIN
      </h2>

      <div className="flex flex-col gap-3">
        {paths.map((path, pi) => (
          <div key={pi} className="flex items-center gap-1 flex-wrap">
            {path.map((step, si) => (
              <div key={step.id} className="flex items-center gap-1">
                {si > 0 && <EvoArrow step={step} />}
                <EvoPokemon
                  step={step}
                  showShiny={showShiny}
                  activeFormSuffix={activeFormSuffix}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}