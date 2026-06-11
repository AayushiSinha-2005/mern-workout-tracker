import BASE_URL from '../config'
import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setErrors('User must be logged in!')
      return
    }

    const workout = { title, load, reps, category }

    const response = await fetch(`${BASE_URL}/workouts`, {
  method: 'POST',
  body: JSON.stringify(workout),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
  }
})

    const json = await response.json()

    if (!response.ok) {
      setErrors(json.error)
      setEmptyFields(json.emptyFields || [])
    } else {
      setErrors(null)
      setTitle('')
      setLoad('')
      setReps('')
      setCategory('')   
      setEmptyFields([])
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type='text' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in Kgs):</label>
      <input 
        type='number' 
        value={load} 
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type='number' 
        value={reps} 
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <label>Category:</label>
      <input 
        type='text' 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={emptyFields.includes('category') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {errors && <div className='error'>{errors}</div>}
    </form>
  )
}

export default WorkoutForm