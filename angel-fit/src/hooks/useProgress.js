import { useState } from 'react'
import { save, load } from '../utils/storage'

export function useProgress() {
  const [goals, setGoals] = useState(() => load('goals', []))
  const [measurements, setMeasurements] = useState(() => load('measurements', []))

  const addGoal = (goal) => {
    const updated = [...goals, { ...goal, id: Date.now(), createdAt: new Date().toISOString() }]
    setGoals(updated)
    save('goals', updated)
  }

  const updateGoal = (id, changes) => {
    const updated = goals.map(g => g.id === id ? { ...g, ...changes } : g)
    setGoals(updated)
    save('goals', updated)
  }

  const addMeasurement = (entry) => {
    const updated = [{ ...entry, date: new Date().toISOString() }, ...measurements]
    setMeasurements(updated)
    save('measurements', updated)
  }

  return { goals, addGoal, updateGoal, measurements, addMeasurement }
}
