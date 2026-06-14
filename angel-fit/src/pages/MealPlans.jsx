import { useState } from 'react'
import { mealPlans } from '../data/meals'

export default function MealPlans({ logMeal }) {
  const [activePlan, setActivePlan] = useState(0)
  const [activeDay, setActiveDay] = useState(0)
  const [logged, setLogged] = useState(null)

  const plan = mealPlans[activePlan]
  const day = plan.days[activeDay] || plan.days[0]

  const handleLog = (meal) => {
    logMeal(meal)
    setLogged(meal.name)
    setTimeout(() => setLogged(null), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-10">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-2">Eat Like an Angel</p>
        <h1 className="font-serif text-4xl text-white">Meal Plans</h1>
      </div>

      <div className="flex gap-4 mb-8">
        {mealPlans.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setActivePlan(i); setActiveDay(0) }}
            className={`px-6 py-3 rounded-lg text-sm border transition-all ${
              activePlan === i
                ? 'bg-gold/10 border-gold text-gold'
                : 'border-gold/20 text-white/50 hover:border-gold/40 hover:text-white'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="text-white/40 mb-8">{plan.description}</p>

      {plan.days.length > 1 && (
        <div className="flex gap-3 mb-8">
          {plan.days.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`px-4 py-2 text-xs tracking-widest uppercase rounded border transition-all ${
                activeDay === i
                  ? 'border-gold text-gold'
                  : 'border-gold/20 text-white/40 hover:text-white'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {day.meals.map((meal, i) => (
          <div key={i} className="bg-noir-soft border border-gold/10 rounded-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-gold/60 text-xs tracking-widest uppercase">{meal.type}</span>
                <h3 className="text-white font-serif text-lg mt-1">{meal.name}</h3>
              </div>
              <span className="text-white/30 text-sm">{meal.calories} kcal</span>
            </div>
            <div className="flex gap-4 text-xs text-white/40 mb-4">
              <span>P: {meal.protein}g</span>
              <span>C: {meal.carbs}g</span>
              <span>F: {meal.fat}g</span>
            </div>
            <button
              onClick={() => handleLog(meal)}
              className="text-xs tracking-widest uppercase text-gold/50 hover:text-gold transition-colors"
            >
              {logged === meal.name ? 'Logged ✓' : '+ Log This Meal'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
