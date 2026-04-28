import { useState } from 'react'
import { useNutrition } from '../hooks/useNutrition'

const DAILY_TARGETS = { calories: 1600, protein: 120, carbs: 140, fat: 55 }

export default function Nutrition() {
  const { entries, logMeal, todayTotals } = useNutrition()
  const totals = todayTotals()
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name) return
    logMeal({
      name: form.name,
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
    })
    setForm({ name: '', calories: '', protein: '', carbs: '', fat: '' })
  }

  const pct = (val, target) => Math.min(100, Math.round((val / target) * 100))

  const macros = [
    { label: 'Calories', value: totals.calories, target: DAILY_TARGETS.calories, unit: 'kcal', color: 'bg-gold' },
    { label: 'Protein', value: totals.protein, target: DAILY_TARGETS.protein, unit: 'g', color: 'bg-blush' },
    { label: 'Carbs', value: totals.carbs, target: DAILY_TARGETS.carbs, unit: 'g', color: 'bg-blush-dark' },
    { label: 'Fat', value: totals.fat, target: DAILY_TARGETS.fat, unit: 'g', color: 'bg-gold-dark' },
  ]

  const todayEntries = entries.filter(
    e => new Date(e.loggedAt).toDateString() === new Date().toDateString()
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-10">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-2">Fuel Your Body</p>
        <h1 className="font-serif text-4xl text-white">Nutrition Tracker</h1>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {macros.map(m => (
          <div key={m.label} className="bg-noir-soft border border-gold/10 rounded-lg p-5">
            <div className="flex justify-between mb-2">
              <span className="text-white/50 text-xs tracking-widest uppercase">{m.label}</span>
              <span className="text-white/30 text-xs">{m.value} / {m.target}{m.unit}</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all`}
                style={{ width: `${pct(m.value, m.target)}%` }}
              />
            </div>
            <p className="text-white text-xl font-serif mt-3">{m.value}<span className="text-white/30 text-sm ml-1">{m.unit}</span></p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-serif text-xl text-white mb-4">Log a Meal</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {[
              { key: 'name', label: 'Food / Meal Name', type: 'text' },
              { key: 'calories', label: 'Calories', type: 'number' },
              { key: 'protein', label: 'Protein (g)', type: 'number' },
              { key: 'carbs', label: 'Carbs (g)', type: 'number' },
              { key: 'fat', label: 'Fat (g)', type: 'number' },
            ].map(field => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.label}
                value={form[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                className="w-full bg-noir-muted border border-gold/10 focus:border-gold/40 rounded px-4 py-3 text-white text-sm outline-none placeholder-white/20 transition-colors"
              />
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-gold/10 hover:bg-gold text-gold hover:text-noir border border-gold/30 rounded text-xs tracking-widest uppercase transition-all"
            >
              Log Meal
            </button>
          </form>
        </div>

        <div>
          <h2 className="font-serif text-xl text-white mb-4">Today's Log</h2>
          {todayEntries.length === 0 ? (
            <p className="text-white/30 text-sm">No meals logged today yet.</p>
          ) : (
            <ul className="space-y-3">
              {todayEntries.map(entry => (
                <li key={entry.id} className="bg-noir-soft border border-gold/10 rounded px-4 py-3 flex justify-between">
                  <span className="text-white/80 text-sm">{entry.name}</span>
                  <span className="text-gold/60 text-sm">{entry.calories} kcal</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
