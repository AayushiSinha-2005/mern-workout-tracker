import { useState } from 'react'
// import EditModal from './EditModal'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { FaEdit, FaTrash } from 'react-icons/fa'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(workout.title)
  const [load, setLoad] = useState(workout.load)
  const [reps, setReps] = useState(workout.reps)
  const [category, setCategory] = useState(workout.category)
  // const [showModal, setShowModal] = useState(false);
  const handleDelete = async () => {
    if (!user) return

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  const handleUpdate = async () => {
    if (!user) return

    const updatedWorkout = { title, load, reps, category }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json })
      setIsEditing(false)
    }
  }
return (
  <div className="workout-details">
    {!isEditing ? (
      <>
        <h4>{workout.title}</h4>
        <p><strong>Load:</strong> {workout.load} kg</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <p><strong>Category:</strong> {workout.category}</p>
        <p><strong>Total Volume:</strong> {workout.totalVolume} kg</p>

        <div className="action-buttons">
  <button 
    className="edit-btn" 
    onClick={() => setIsEditing(true)}
  >
    <FaEdit /> Edit
  </button>

  <button 
    className="delete-btn" 
    onClick={handleDelete}
  >
    <FaTrash /> Delete
  </button>
</div>
        
      </>
    ) : (
      <div className="edit-form">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
        <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <div className="btn-group">
          <button className="save-btn" onClick={handleUpdate}>Save</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    )}
  </div>
)
}

export default WorkoutDetails