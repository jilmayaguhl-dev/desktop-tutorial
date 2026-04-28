import { useState } from 'react'
import { useProgress } from '../hooks/useProgress'

export default function Progress() {
  const { goals, addGoal, updateGoal, measurements, addMeasurement } = useProgress()
  const [goalForm, setGoalForm] = useState({ title: '', target: '', unit: '' })
  const [measureForm, setMeasureForm] = useState({ weight: '', waist: '', hips: '', chest: '' })

  const handleGoal = (e) => {
    e.preventDefault()
    if (!goalForm.title) return
    addGoal({ ...goalForm, current: 0, completed: false })
    setGoalForm({ title: '', target: '', unit: '' })
  }

  const handleMeasure = (e) => {
    e.preventDefault()
    addMeasurement(measureForm)
    setMeasureForm({ weight: '', waist: '', hips: '', chest: '' })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-10">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-2">Your Journey</p>
        <h1 className="font-serif text-4xl text-white">Progress</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="font-serif text-xl text-white mb-4">Set a Goal</h2>
          <form onSubmit={handleGoal} className="space-y-3">
            <input
              placeholder="Goal (e.g. Run 5k, Lose 5lbs)"
              value={goalForm.title}
              onChange={e => setGoalForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-noir-muted border border-gold/10 focus:border-gold/40 rounded px-4 py-3 text-white text-sm outline-none placeholder-white/20"
            />
            <div className="flex gap-3">
              <input
                placeholder="Target value"
                value={goalForm.target}
                onChange={e => setGoalForm(f => ({ ...f, target: e.target.value }))}
                className="flex-1 bg-noir-muted border border-gold/10 focus:border-gold/40 rounded px-4 py-3 text-white text-sm outline-none placeholder-white/20"
              />
              <input
                placeholder="Unit (lbs, km…)"
                value={goalForm.unit}
                onChange={e => setGoalForm(f => ({ ...f, unit: e.target.value }))}
                className="flex-1 bg-noir-muted border border-gold/10 focus:border-gold/40 rounded px-4 py-3 text-white text-sm outline-none placeholder-white/20"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gold/10 hover:bg-gold text-gold hover:text-noir border border-gold/30 rounded text-xs tracking-widest uppercase transition-all"
            >
              Add Goal
            </button>
          </form>
        </div>

        <div>
          <h2 className="font-serif text-xl text-white mb-4">Log Measurements</h2>
          <form onSubmit={handleMeasure} className="space-y-3">
            {[
              { key: 'weight', label: 'Weight (lbs)' },
              { key: 'waist', label: 'Waist (in)' },
              { key: 'hips', label: 'Hips (in)' },
              { key: 'chest', label: 'Chest (in)' },
            ].map(f => (
              <input
                key={f.key}
                type="number"
                placeholder={f.label}
                value={measureForm[f.key]}
                onChange={e => setMeasureForm(m => ({ ...m, [f.key]: e.target.value }))}
                className="w-full bg-noir-muted border border-gold/10 focus:border-gold/40 rounded px-4 py-3 text-white text-sm outline-none placeholder-white/20"
              />
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-gold/10 hover:bg-gold text-gold hover:text-noir border border-gold/30 rounded text-xs tracking-widest uppercase transition-all"
            >
              Save Measurements
            </button>
          </form>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-serif text-xl text-white mb-4">Goals</h2>
          {goals.length === 0 ? (
            <p className="text-white/30 text-sm">No goals set yet.</p>
          ) : (
            <ul className="space-y-3">
              {goals.map(goal => (
                <li key={goal.id} className="bg-noir-soft border border-gold/10 rounded-lg px-5 py-4 flex items-center gap-4">
                  <button
                    onClick={() => updateGoal(goal.id, { completed: !goal.completed })}
                    className={`w-5 h-5 rounded-full border flex-shrink-0 transition-all ${
                      goal.completed ? 'bg-gold border-gold' : 'border-gold/30'
                    }`}
                  />
                  <div>
                    <p className={`text-sm ${goal.completed ? 'text-white/30 line-through' : 'text-white'}`}>
                      {goal.title}
                    </p>
                    {goal.target && (
                      <p className="text-gold/50 text-xs mt-0.5">Target: {goal.target} {goal.unit}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="font-serif text-xl text-white mb-4">Measurement History</h2>
          {measurements.length === 0 ? (
            <p className="text-white/30 text-sm">No measurements logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {measurements.slice(0, 5).map((m, i) => (
                <li key={i} className="bg-noir-soft border border-gold/10 rounded-lg px-5 py-4">
                  <p className="text-white/30 text-xs mb-2">{new Date(m.date).toLocaleDateString()}</p>
                  <div className="flex gap-6 text-sm">
                    {m.weight && <span className="text-white/70">{m.weight} lbs</span>}
                    {m.waist && <span className="text-white/70">W: {m.waist}"</span>}
                    {m.hips && <span className="text-white/70">H: {m.hips}"</span>}
                    {m.chest && <span className="text-white/70">C: {m.chest}"</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
