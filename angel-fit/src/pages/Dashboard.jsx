export default function Dashboard({ setPage, workoutLog, todayTotals }) {
  const totals = todayTotals()
  const todayWorkouts = workoutLog.filter(
    w => new Date(w.completedAt).toDateString() === new Date().toDateString()
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">Welcome Back</p>
        <h1 className="font-serif text-5xl text-white mb-4">Your Angel Body Awaits</h1>
        <p className="text-white/40 tracking-wide">Stay consistent. Stay graceful. Stay strong.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Workouts Today', value: todayWorkouts.length },
          { label: 'Calories', value: totals.calories },
          { label: 'Protein (g)', value: totals.protein },
          { label: 'Total Sessions', value: workoutLog.length },
        ].map(stat => (
          <div key={stat.label} className="bg-noir-soft border border-gold/10 rounded-lg p-6 text-center">
            <p className="text-3xl font-serif text-gold mb-1">{stat.value}</p>
            <p className="text-white/40 text-xs tracking-widest uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { id: 'workouts', title: 'Train', desc: 'Angel sculpt, pilates & cardio' },
          { id: 'meals', title: 'Eat', desc: 'Clean meal plans for every goal' },
          { id: 'progress', title: 'Track', desc: 'Goals, measurements & milestones' },
        ].map(card => (
          <button
            key={card.id}
            onClick={() => setPage(card.id)}
            className="group bg-noir-soft border border-gold/10 hover:border-gold/40 rounded-lg p-8 text-left transition-all"
          >
            <h2 className="font-serif text-2xl text-white mb-2 group-hover:text-gold transition-colors">
              {card.title}
            </h2>
            <p className="text-white/40 text-sm">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
