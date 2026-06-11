const express = require('express');
const router = express.Router();

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkoutAnalytics
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

// auth middleware
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// CREATE workout
router.post('/', createWorkout);

// analytics (IMPORTANT: put BEFORE /:id)
router.get('/analytics/summary', getWorkoutAnalytics);

// GET single workout
router.get('/:id', getWorkout);

// DELETE workout
router.delete('/:id', deleteWorkout);

// UPDATE workout
router.patch('/:id', updateWorkout);

module.exports = router;