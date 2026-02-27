const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
exports.getWorkouts = async (req, res) => {
    // Sirf logged-in user ke workouts fetch karne ke liye filter lagaya
    const user_id = req.user._id
    
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 })
    
    if (!workouts) {
        return res.status(400).json({ error: 'No entries found' })
    }
    res.status(200).json(workouts)
}

// get a single workout by its id
exports.getWorkout = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOne({ _id: id, user_id })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// create a new workout
exports.createWorkout = async (req, res) => {
const { title, load, reps, category } = req.body;
  let emptyFields = [];

  if (!title) emptyFields.push('title');
  if (!load) emptyFields.push('load');
  if (!reps) emptyFields.push('reps');
  if (!category) emptyFields.push('category');

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all the fields',
      emptyFields
    });
  }

  try {
    const user_id = req.user._id;
    const totalVolume = load * reps;

    const workout = await Workout.create({
      title,
      load,
      reps,
      category,
      totalVolume: load * reps,
      user_id
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// delete a workout
exports.deleteWorkout = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id, user_id })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
exports.updateWorkout = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id
  const { load, reps } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const existingWorkout = await Workout.findOne({ _id: id, user_id })

  if (!existingWorkout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  let updatedData = { ...req.body }

  if (load !== undefined || reps !== undefined) {
    const finalLoad = load ?? existingWorkout.load
    const finalReps = reps ?? existingWorkout.reps
    updatedData.totalVolume = finalLoad * finalReps
  }

  const updatedWorkout = await Workout.findOneAndUpdate(
    { _id: id, user_id },
    updatedData,
    { new: true }
  )

  res.status(200).json(updatedWorkout)
}

// Get analytics
exports.getWorkoutAnalytics = async (req, res) => {
  try {
    const user_id = req.user._id;

    const analytics = await Workout.aggregate([
      {
        $match: { user_id }
      },
      {
        $group: {
          _id: "$category",
          totalWorkouts: { $sum: 1 },
          totalVolume: { $sum: "$totalVolume" }
        }
      }
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};