import BASE_URL from "../config";
import { useState } from "react";

const EditModal = ({ workout, onClose, onUpdate }) => {
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [category, setCategory] = useState(workout.category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/workouts/${workout._id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${user.token}`   // IMPORTANT FIX
  },
  body: JSON.stringify({ title, load, reps, category }),
});

    const json = await response.json();

    if (response.ok) {
      onUpdate(json);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Workout</h3>

        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={load} onChange={(e) => setLoad(e.target.value)} />
          <input value={reps} onChange={(e) => setReps(e.target.value)} />
          <input value={category} onChange={(e) => setCategory(e.target.value)} />

          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;