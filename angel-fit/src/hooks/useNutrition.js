import { useState } from 'react'
import { save, load } from '../utils/storage'

export function useNutrition() {
  const [entries, setEntries] = useState(() => load('nutrition-log', []))

  const logMeal = (meal) => {
    const entry = { ...meal, id: Date.now(), loggedAt: new Date().toISOString() }
    const updated = [entry, ...entries]
    setEntries(updated)
    save('nutrition-log', updated)
  }

  const todayTotals = () => {
    const today = new Date().toDateString()
    return entries
      .filter(e => new Date(e.loggedAt).toDateString() === today)
      .reduce(
        (acc, e) => ({
          calories: acc.calories + (e.calories || 0),
          protein: acc.protein + (e.protein || 0),
          carbs: acc.carbs + (e.carbs || 0),
          fat: acc.fat + (e.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      )
  }

  return { entries, logMeal, todayTotals }
}
