import { Link, useParams } from 'react-router-dom'
import { usePokemon, usePokemonSpecies } from "../hooks/usePokemon"
import { usePokedexStore } from '../store/pokedexStore'
import { TYPE_COLORS } from '../types/pokemon'
import { useState, useEffect } from 'react'
import { StatBar } from '../components/StatBar'
import { MovesTable } from '../components/MovesTable'
import { EvolutionChain } from '../components/EvolutionChain'
import { PokemonForms } from '../components/PokemonForms'
import { BreedingTab } from '../components/BreedingTab'

function PokemonDetailPage() {
  const { id } = useParams()

  const { pokemon, loading, error } = usePokemon(id ?? '')
  const { species } = usePokemonSpecies(id ?? '')

  const { isFavorite, toggleFavorite } = usePokedexStore()

  const [showShiny, setShowShiny] = useState(false)
  const [activeTab, setActiveTab] = useState<'stats' | 'abilities' | 'moves' | 'breeding'>('stats')
  const [formSprite, setFormSprite] = useState<string | null>(null)
  const [formName, setFormName] = useState<string | null>(null)
  const [formId, setFormId] = useState<number | null>(null)

  useEffect(() => {
    setFormSprite(null)
    setFormName(null)
    setFormId(null)
  }, [id])

  if (loading) return <p className="text-white text-center mt-20 font-body">Loading...</p>
  if (error) return <p className="text-neon-red text-center mt-20 font-body">Error: {error}</p>
  if (!pokemon) return <p className="text-white text-center mt-20 font-body">Pokémon não encontrado</p>

  const fav = isFavorite(pokemon.id)

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const primaryColor = TYPE_COLORS[primaryType] ?? TYPE_COLORS.normal

  const sprite = formSprite
    ? formSprite
    : showShiny
      ? pokemon.sprites.other["official-artwork"].front_shiny
      : pokemon.sprites.other["official-artwork"].front_default

  // detecta o sufixo da forma ativa ex: "vulpix-alola" → "alola"
  const activeFormSuffix = formName
    ? formName.replace(`${pokemon.name}-`, '')
    : null

  const flavorText =
    species?.flavor_text_entries
        .find((e) => e.language.name === 'pt')
        ?.flavor_text
        .replace(/\f/g, ' ')
    ??
    species?.flavor_text_entries
        .find((e) => e.language.name === 'en')
        ?.flavor_text
        .replace(/\f/g, ' ')
    ?? ''

  const genus =
    species?.genera
        .find((g) => g.language.name === 'pt')
        ?.genus
    ??
    species?.genera
        .find((g) => g.language.name === 'en')
        ?.genus
    ?? ''

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0f' }}>

      <div
        className="absolute inset-0 pointer-events-none animate-pulsebg"
        style={{ background: `radial-gradient(circle at 50% 35%, ${primaryColor}20, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 mb-8 font-body text-xs text-white/30">
          <Link to="/" className="hover:text-neon-green transition-colors">
            pokédex
          </Link>
          <span>/</span>
          <span style={{ color: primaryColor }}>{pokemon.name}</span>
        </div>

        {/* main layout */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div>
            {/* image card */}
            <div
              className="rounded-2xl relative p-8 flex items-center justify-center overflow-visible mt-8"
              style={{
                background: `radial-gradient(circle at center, ${primaryColor}18 0%, transparent 70%)`,
                border: `1px solid ${primaryColor}44`
              }}
            >
              {/* forms alternativas */}
              {species?.varieties && (
                <PokemonForms
                  baseName={pokemon.name}
                  varieties={species.varieties}
                  showShiny={showShiny}
                  primaryColor={primaryColor}
                  onSpriteChange={(sprite, name, id) => {
                    setFormSprite(sprite)
                    setFormName(name)
                    setFormId(id)
                  }}
                />
              )}

              {/* shiny button */}
              <button
                onClick={() => setShowShiny(!showShiny)}
                className="absolute top-3 right-3 font-display text-[8px] px-2 py-1 rounded border"
                style={showShiny
                  ? { color: '#FFD700', borderColor: '#FFD70055', background: '#FFD70010' }
                  : { color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.1)' }
                }
              >
                🌟 SHINY
              </button>

              {/* favorite */}
              <button
                onClick={() => toggleFavorite(pokemon.id)}
                className="absolute top-2 left-5 text-3xl transition-transform hover:scale-125"
                style={{ color: fav ? '#FFD700' : 'rgba(255,255,255,0.2)' }}
              >
                {fav ? '★' : '☆'}
              </button>

              <img
                src={sprite ?? ''}
                alt={pokemon.name}
                className="w-64 h-64 object-contain animate-float"
                style={{ filter: `drop-shadow(0 0 24px ${primaryColor}80)` }}
              />
            </div>

            {/* pokemon info */}
            <div className="mt-6">

              <p className="font-body text-xs text-white/30">
                #{String(pokemon.id).padStart(5, '0')} · {genus}
              </p>

              <h1 className="font-display text-3xl capitalize" style={{ color: primaryColor }}>
                {(formName ?? pokemon.name).replace(/-/g, ' ')}
              </h1>

              <div className="flex gap-2 mt-2 mb-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="font-body text-xs px-3 py-1 rounded-full border capitalize"
                    style={{
                      color: TYPE_COLORS[type.name],
                      borderColor: `${TYPE_COLORS[type.name]}55`,
                      background: `${TYPE_COLORS[type.name]}15`
                    }}
                  >
                    {type.name}
                  </span>
                ))}
              </div>

              {flavorText && (
                <p className="font-body text-xs text-white/50 leading-relaxed italic border-l-2 pl-3"
                  style={{ borderColor: `${primaryColor}44` }}>
                  {flavorText}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-base-card border border-base-border rounded-lg p-3 text-center">
                  <p className="text-[12px] text-white/30 mb-1">ALTURA</p>
                  <p className="font-display text-xs" style={{ color: primaryColor }}>
                    {(pokemon.height / 10).toFixed(1)}m
                  </p>
                </div>
                <div className="bg-base-card border border-base-border rounded-lg p-3 text-center">
                  <p className="text-[12px] text-white/30 mb-1">PESO</p>
                  <p className="font-display text-xs" style={{ color: primaryColor }}>
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </p>
                </div>
                <div className="bg-base-card border border-base-border rounded-lg p-3 text-center">
                  <p className="text-[12px] text-white/30 mb-1">GERAÇÃO</p>
                  <p className="font-display text-xs" style={{ color: primaryColor }}>
                    {species?.generation.name.replace('generation-', '').toUpperCase() ?? '?'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>

            {/* tabs */}
            <div className="border-b border-base-border flex gap-6 font-display text-xs mb-6">
              {(['stats', 'abilities', 'moves', 'breeding'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 uppercase ${
                    activeTab === tab
                      ? 'text-neon-green border-b border-neon-green'
                      : 'text-white/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* stats */}
            {activeTab === 'stats' && (
              <div className="flex flex-col gap-3 min-h-[320px]">
                {pokemon.stats.map(({ stat, base_stat }, i) => (
                  <StatBar
                    key={stat.name}
                    statName={stat.name}
                    value={base_stat}
                    color={primaryColor}
                    delay={i * 0.08}
                  />
                ))}
                <div className="pt-3 border-t border-base-border flex items-center gap-3 mt-3">
                  <span className="font-display w-16 text-right text-white/40 text-[9px]">
                    TOTAL
                  </span>
                  <span className="font-display text-xs" style={{ color: primaryColor }}>
                    {pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)}
                  </span>
                </div>
              </div>
            )}

            {/* abilities */}
            {activeTab === 'abilities' && (
              <div className="flex flex-col gap-3 min-h-[320px]">
                {pokemon.abilities.map(({ ability, is_hidden }) => (
                  <div
                    key={ability.name}
                    className="px-4 py-3 rounded-lg border"
                    style={{
                      background: `${primaryColor}08`,
                      borderColor: `${primaryColor}25`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs capitalize" style={{ color: primaryColor }}>
                        {ability.name.replace(/-/g, ' ')}
                      </span>
                      {is_hidden && (
                        <span className="font-body border border-white/10 rounded px-1 text-white/30" style={{ fontSize: '9px' }}>
                          oculta
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* moves */}
            {activeTab === 'moves' && (
              <MovesTable moves={pokemon.moves} primaryColor={primaryColor} />
            )}

            {/* breeding */}
            {activeTab === 'breeding' && species && (
              <BreedingTab species={species} primaryColor={primaryColor} />
            )}

            {/* evolution chain */}
            {species?.evolution_chain?.url && (
              <EvolutionChain
                chainUrl={species.evolution_chain.url}
                primaryColor={primaryColor}
                showShiny={showShiny}
                activeFormId={formId}
                baseId={pokemon.id}
                activeFormSuffix={activeFormSuffix}
              />
            )}

          </div>
        </div>

        {/* navigation */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {pokemon.id > 1 && (
            <Link
              to={`/pokemon/${pokemon.id - 1}`}
              className="font-display text-xs px-4 py-2 rounded border border-base-border text-white/30 hover:text-white/70 hover:border-white/40 transition-all"
            >
              ← #{String(pokemon.id - 1).padStart(3, '0')}
            </Link>
          )}
          {pokemon.id < 1025 && (
            <Link
              to={`/pokemon/${pokemon.id + 1}`}
              className="font-display text-xs px-4 py-2 rounded border border-base-border text-white/30 hover:text-white/70 hover:border-white/40 transition-all"
            >
              #{String(pokemon.id + 1).padStart(3, '0')} →
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}

export default PokemonDetailPage