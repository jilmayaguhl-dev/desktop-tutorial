import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import MealPlans from './pages/MealPlans'
import Nutrition from './pages/Nutrition'
import Progress from './pages/Progress'
import { useWorkouts } from './hooks/useWorkouts'
import { useNutrition } from './hooks/useNutrition'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const { log: workoutLog, logWorkout } = useWorkouts()
  const { logMeal, todayTotals } = useNutrition()

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard setPage={setPage} workoutLog={workoutLog} todayTotals={todayTotals} />
      case 'workouts': return <Workouts logWorkout={logWorkout} />
      case 'meals': return <MealPlans logMeal={logMeal} />
      case 'nutrition': return <Nutrition />
      case 'progress': return <Progress />
      default: return <Dashboard setPage={setPage} workoutLog={workoutLog} todayTotals={todayTotals} />
    }
  }

  return (
    <div className="min-h-screen bg-noir">
      <Navbar activePage={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </div>
  )
}
