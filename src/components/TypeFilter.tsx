import { TYPE_COLORS } from "../types/pokemon";
import { usePokedexStore } from "../store/pokedexStore";

export function TypeFilter() {
  const { selectedType, setSelectedType, setCurrentPage } = usePokedexStore()

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className="font-body text-xs px-3 py-1 rounded-full border border-base-border text-white/40 hover:text-white/70 transition-all"
        onClick={() => { setSelectedType(''); setCurrentPage(0) }}
      >
        Todos
      </button>
      {Object.keys(TYPE_COLORS).map((type) => (
      <button
        key={type}
        className="font-body text-xs px-3 py-1 rounded-full border transition-all capitalize "
        style={{
          color: selectedType === type ? TYPE_COLORS[type] : `${TYPE_COLORS[type]}99`,
          borderColor: selectedType === type ? TYPE_COLORS[type] : `${TYPE_COLORS[type]}55`,
          background: selectedType === type ? `${TYPE_COLORS[type]}33` : 'transparent',
        }}
        onClick={() => { setSelectedType(type); setCurrentPage(0) }}
      >
        {type}
      </button>
  ))}
</div>
  )
}

export default TypeFilter