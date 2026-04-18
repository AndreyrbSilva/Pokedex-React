import { TYPE_COLORS } from '../types/pokemon'
import { useState, useEffect } from 'react'

interface MoveEntry {
  move: { name: string; url: string }
  version_group_details: {
    level_learned_at: number
    move_learn_method: { name: string }
    version_group: { name: string }
  }[]
}

interface MovesTableProps {
  moves: MoveEntry[]
  primaryColor: string
}

type LearnMethod = 'level-up' | 'machine' | 'egg' | 'tutor' | 'other'

function getLearnMethod(details: MoveEntry['version_group_details']): { method: LearnMethod; level: number | null } {
  const levelUp = details.find((d) => d.move_learn_method.name === 'level-up')
  if (levelUp) return { method: 'level-up', level: levelUp.level_learned_at }
  if (details.some((d) => d.move_learn_method.name === 'machine')) return { method: 'machine', level: null }
  if (details.some((d) => d.move_learn_method.name === 'egg')) return { method: 'egg', level: null }
  if (details.some((d) => d.move_learn_method.name === 'tutor')) return { method: 'tutor', level: null }
  return { method: 'other', level: null }
}

function LevelCell({ method, level, primaryColor }: { method: LearnMethod; level: number | null; primaryColor: string }) {
  if (method === 'level-up') return (
    <td className="py-3 pl-2 font-display text-xs" style={{ color: `${primaryColor}80` }}>
      {level && level > 0 ? level : '1'}
    </td>
  )
  if (method === 'machine') return (
    <td className="py-3 pl-2 font-display text-[9px] text-white/40">TM</td>
  )
  if (method === 'egg') return (
    <td className="py-3 pl-2 text-sm">🥚</td>
  )
  if (method === 'tutor') return (
    <td className="py-3 pl-2 font-display text-[9px] text-white/40">TUTOR</td>
  )
  return <td className="py-3 pl-2 font-display text-xs text-white/20">—</td>
}

export function MovesTable({ moves, primaryColor }: MovesTableProps) {
  const processed = moves
    .map((m) => {
      const { method, level } = getLearnMethod(m.version_group_details)
      return { name: m.move.name, method, level }
    })
    .sort((a, b) => {
      const order: Record<LearnMethod, number> = { 'level-up': 0, 'egg': 1, 'machine': 2, 'tutor': 3, 'other': 4 }
      if (a.method !== b.method) return order[a.method] - order[b.method]
      if (a.level !== null && b.level !== null) return a.level - b.level
      return 0
    })
    .slice(0, 60)

  return (
    <div className="w-full max-h-80 overflow-y-auto">
      <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '44px' }} />
          <col />
          <col style={{ width: '110px' }} />
          <col style={{ width: '52px' }} />
          <col style={{ width: '52px' }} />
        </colgroup>
        <thead>
          <tr className="sticky top-0 z-10" style={{ background: '#0a0a0f' }}>
            {['LV', 'MOVE', 'TYPE', 'PWR', 'ACC'].map((col) => (
              <th
                key={col}
                className="font-display text-[9px] pb-2 pt-1 text-left pr-3 pl-2"
                style={{ color: `${primaryColor}99`, borderBottom: `1px solid ${primaryColor}30` }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processed.map(({ name, method, level }, i) => (
            <MoveRow
              key={name}
              name={name}
              method={method}
              level={level}
              primaryColor={primaryColor}
              even={i % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface MoveData {
  type: { name: string }
  power: number | null
  accuracy: number | null
  damage_class: { name: string }
}

function MoveRow({ name, method, level, primaryColor, even }: {
  name: string
  method: LearnMethod
  level: number | null
  primaryColor: string
  even: boolean
}) {
  const [data, setData] = useState<MoveData | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://pokeapi.co/api/v2/move/${name}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setData(d) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [name])

  const typeColor = data ? (TYPE_COLORS[data.type.name] ?? '#fff') : 'transparent'

  return (
    <tr style={{ background: even ? `${primaryColor}06` : 'transparent' }}>
      <LevelCell method={method} level={level} primaryColor={primaryColor} />
      <td className="py-3 font-body text-xs capitalize text-white/70 truncate pr-4">
        {name.replace(/-/g, ' ')}
      </td>
      <td className="py-3 pr-4">
        {data ? (
          <span
            className="font-display text-[9px] px-2 py-1 rounded capitalize"
            style={{ color: typeColor, background: `${typeColor}20`, border: `1px solid ${typeColor}40` }}
          >
            {data.type.name}
          </span>
        ) : (
          <span className="font-body text-[9px] text-white/20">...</span>
        )}
      </td>
      <td className="py-3 pr-3 font-display text-xs text-white/60">
        {data ? (data.power ?? '—') : '·'}
      </td>
      <td className="py-3 font-display text-xs text-white/60">
        {data ? (data.accuracy ?? '—') : '·'}
      </td>
    </tr>
  )
}