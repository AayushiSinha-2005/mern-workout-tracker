import BASE_URL from '../config'
import { useEffect, useState } from 'react'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${BASE_URL}/workouts`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    if (user) {
      fetchWorkouts()
    }

  }, [dispatch, user])

  // ✅ FILTER LOGIC
  const filteredWorkouts = workouts?.filter((workout) => {
    if (selectedCategory === 'All') return true
    return workout.category === selectedCategory
  })

  // ✅ ANALYTICS LOGIC (IMPORTANT — return ke upar hona chahiye)

  const totalWorkouts = workouts ? workouts.length : 0

  const totalVolume = workouts
    ? workouts.reduce((sum, workout) => sum + (workout.totalVolume || 0), 0)
    : 0

  const categoryCount = {}

workouts?.forEach((workout) => {
  if (workout.category) {
    categoryCount[workout.category] =
      (categoryCount[workout.category] || 0) + 1
  }
})

let mostTrainedCategory = 'N/A'

if (Object.keys(categoryCount).length > 0) {
  mostTrainedCategory = Object.keys(categoryCount).reduce((a, b) =>
    categoryCount[a] > categoryCount[b] ? a : b
  )
}

  return (
    <div className='home'>

      <div className="workouts">

        <div className="workouts-header">
          <h2>Workouts</h2>
        </div>

        {/* ✅ SUMMARY SECTION */}
        <div className="summary-box">
          <div className="summary-card">
            <h3>Total Workouts</h3>
            <p>{totalWorkouts}</p>
          </div>

          <div className="summary-card">
            <h3>Total Volume</h3>
            <p>{totalVolume} kg</p>
          </div>

          <div className="summary-card">
            <h3>Most Trained</h3>
            <p>{mostTrainedCategory}</p>
          </div>
        </div>

        {/* ✅ CATEGORY DROPDOWN */}
        <div style={{ marginBottom: '20px' }}>
          <label>Filter by Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Arms">Arms</option>
            <option value="Cardio">Cardio</option>
          </select>
        </div>

        {filteredWorkouts && filteredWorkouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}

      </div>

      <WorkoutForm />

    </div>
  )
}

export default Home