import { useState } from 'react'
import { workouts, categories } from '../data/workouts'

export default function Workouts({ logWorkout }) {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const [logged, setLogged] = useState(null)

  const filtered = filter === 'All' ? workouts : workouts.filter(w => w.category === filter)

  const handleLog = (workout) => {
    logWorkout(workout)
    setLogged(workout.id)
    setTimeout(() => setLogged(null), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-10">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-2">Train Like an Angel</p>
        <h1 className="font-serif text-4xl text-white">Workouts</h1>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase border transition-all ${
              filter === cat
                ? 'bg-gold text-noir border-gold'
                : 'border-gold/20 text-white/50 hover:border-gold/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(workout => (
          <div key={workout.id} className="bg-noir-soft border border-gold/10 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-gold text-xs tracking-widest uppercase">{workout.category}</span>
                  <h2 className="font-serif text-2xl text-white mt-1">{workout.name}</h2>
                </div>
                <span className="text-white/30 text-sm">{workout.duration} min</span>
              </div>
              <p className="text-white/40 text-sm mb-4">{workout.description}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {workout.focus.map(f => (
                  <span key={f} className="text-xs border border-blush/30 text-blush px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActive(active === workout.id ? null : workout.id)}
                  className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                >
                  {active === workout.id ? 'Hide Exercises' : 'View Exercises'}
                </button>
                <button
                  onClick={() => handleLog(workout)}
                  className="ml-auto text-xs tracking-widest uppercase bg-gold/10 hover:bg-gold text-gold hover:text-noir px-4 py-2 rounded transition-all"
                >
                  {logged === workout.id ? 'Logged ✓' : 'Log Workout'}
                </button>
              </div>
            </div>

            {active === workout.id && (
              <div className="border-t border-gold/10 px-6 py-4">
                <ul className="space-y-2">
                  {workout.exercises.map((ex, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-white/70">{ex.name}</span>
                      <span className="text-gold/60">{ex.sets} × {ex.reps}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
