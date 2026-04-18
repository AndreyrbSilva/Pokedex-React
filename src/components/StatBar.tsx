import { motion } from 'framer-motion'
import { STAT_LABELS } from '../types/pokemon'

const STAT_COLORS: Record<string, string> = {
  hp:               '#ff3131',
  attack:           '#ff6b35',
  defense:          '#ffe600',
  'special-attack': '#39ff14',
  'special-defense':'#00d4ff',
  speed:            '#bf5af2',
}

interface StatBarProps {
  statName: string
  value: number
  color: string
  delay?: number
}

export function StatBar({ statName, value, color, delay = 0 }: StatBarProps) {
  const barColor = STAT_COLORS[statName] ?? color
  const pct = Math.min((value / 255) * 100, 100)

  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-right w-16 text-white/40" style={{ fontSize: '9px' }}>
        {STAT_LABELS[statName] ?? statName}
      </span>
      <span className="font-body text-xs w-8 text-white/60">
        {value}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay, ease: 'easeOut' }}
          style={{
            background: barColor,
            boxShadow: `0 0 6px ${barColor}80`,
          }}
        />
      </div>
    </div>
  )
}