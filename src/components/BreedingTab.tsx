interface BreedingTabProps {
  species: {
    egg_groups: { name: string }[]
    gender_rate: number
    hatch_counter: number
  }
  primaryColor: string
}

function getGenderText(genderRate: number): string {
  if (genderRate === -1) return 'Genderless'
  const female = (genderRate / 8) * 100
  const male = 100 - female
  return `${male}% ♂ · ${female}% ♀`
}

function getEggSteps(hatchCounter: number): string {
  const min = (hatchCounter + 1) * 255
  const max = (hatchCounter + 1) * 257
  return `${hatchCounter} ciclos (${min.toLocaleString()}–${max.toLocaleString()} passos)`
}

export function BreedingTab({ species, primaryColor }: BreedingTabProps) {
  const rows = [
    {
      label: 'EGG GROUPS',
      value: species.egg_groups.map((g) => g.name.replace(/-/g, ' ')).join(', ') || '—',
    },
    {
      label: 'GÊNERO',
      value: getGenderText(species.gender_rate),
    },
    {
      label: 'EGG CYCLES',
      value: getEggSteps(species.hatch_counter),
    },
  ]

  return (
    <div className="flex flex-col gap-3 min-h-[320px]">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="px-4 py-3 rounded-lg border"
          style={{ background: `${primaryColor}08`, borderColor: `${primaryColor}25` }}
        >
          <p className="font-display text-[9px] text-white/30 mb-1 tracking-widest">{label}</p>
          <p className="font-display text-xs capitalize" style={{ color: primaryColor }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}