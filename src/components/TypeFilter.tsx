import { TYPE_COLORS } from "../types/pokemon";
import { usePokedexStore } from "../store/pokedexStore";

export function TypeFilter() {
  const { selectedType, setSelectedType, setCurrentPage } = usePokedexStore()

  const types = Object.keys(TYPE_COLORS)

  const handleChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(0)
  }

  return (
    <>
      {/* Mobile: dropdown */}
      <div className="flex justify-center mb-4 md:hidden">
        <select
          value={selectedType}
          onChange={(e) => handleChange(e.target.value)}
          className="bg-base-card border border-base-border rounded-full px-4 py-2 font-body text-xs text-white focus:outline-none focus:border-neon-green/50 transition-colors capitalize w-full max-w-lg"
          style={{ color: selectedType ? TYPE_COLORS[selectedType] : 'rgba(255,255,255,0.6)' }}
        >
          <option value="">Todos os tipos</option>
          {types.map((type) => (
            <option key={type} value={type} style={{ color: TYPE_COLORS[type] }}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: pills */}
      <div className="hidden md:flex flex-wrap justify-center gap-2 mb-4">
        <button
          className="font-body text-xs px-3 py-1 rounded-full border border-base-border text-white/40 hover:text-white/70 transition-all"
          onClick={() => handleChange('')}
        >
          Todos
        </button>
        {types.map((type) => (
          <button
            key={type}
            className="font-body text-xs px-3 py-1 rounded-full border transition-all capitalize"
            style={{
              color: selectedType === type ? TYPE_COLORS[type] : `${TYPE_COLORS[type]}99`,
              borderColor: selectedType === type ? TYPE_COLORS[type] : `${TYPE_COLORS[type]}55`,
              background: selectedType === type ? `${TYPE_COLORS[type]}33` : 'transparent',
            }}
            onClick={() => handleChange(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  )
}

export default TypeFilter