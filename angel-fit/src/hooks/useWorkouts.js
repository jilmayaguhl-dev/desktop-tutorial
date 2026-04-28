import { useState } from 'react'
import { save, load } from '../utils/storage'

export function useWorkouts() {
  const [log, setLog] = useState(() => load('workout-log', []))

  const logWorkout = (workout) => {
    const entry = { ...workout, completedAt: new Date().toISOString() }
    const updated = [entry, ...log]
    setLog(updated)
    save('workout-log', updated)
  }

  const clearLog = () => {
    setLog([])
    save('workout-log', [])
  }

  return { log, logWorkout, clearLog }
}
