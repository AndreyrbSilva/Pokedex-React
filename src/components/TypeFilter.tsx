import { useState, useRef, useEffect } from "react";
import { TYPE_COLORS } from "../types/pokemon";
import { usePokedexStore } from "../store/pokedexStore";

export function TypeFilter() {
  const { selectedType, setSelectedType, setCurrentPage } = usePokedexStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const types = Object.keys(TYPE_COLORS)

  const handleChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(0)
    setOpen(false)
  }

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedColor = selectedType ? TYPE_COLORS[selectedType] : null

  return (
    <>
      {/* Mobile: dropdown customizado */}
      <div ref={ref} className="relative flex justify-center mb-4 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full max-w-lg flex items-center justify-between bg-base-card border border-base-border rounded-full px-5 py-2.5 font-body text-xs transition-colors focus:outline-none"
          style={{
            borderColor: selectedColor ? `${selectedColor}66` : undefined,
            color: selectedColor ?? 'rgba(255,255,255,0.4)',
          }}
        >
          <span className="capitalize">{selectedType || 'Todos os tipos'}</span>
          <span
            className="text-white/30 transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▾
          </span>
        </button>

        {open && (
          <div className="absolute top-full mt-2 w-full max-w-lg bg-base-card border border-base-border rounded-2xl overflow-hidden z-50 shadow-lg">
            {/* opção Todos */}
            <button
              onClick={() => handleChange('')}
              className="w-full text-left px-5 py-2.5 font-body text-xs text-white/40 hover:bg-white/5 transition-colors"
            >
              Todos os tipos
            </button>

            <div className="h-px bg-base-border" />

            {/* lista de tipos */}
            <div className="max-h-60 overflow-y-auto">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => handleChange(type)}
                  className="w-full text-left px-5 py-2.5 font-body text-xs capitalize flex items-center gap-3 hover:bg-white/5 transition-colors"
                  style={{
                    color: selectedType === type ? TYPE_COLORS[type] : `${TYPE_COLORS[type]}99`,
                    background: selectedType === type ? `${TYPE_COLORS[type]}15` : undefined,
                  }}
                >
                  {/* bolinha colorida */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: TYPE_COLORS[type] }}
                  />
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
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