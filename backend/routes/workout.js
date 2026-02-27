const express = require('express');
const Workout = require('../models/workoutModel');
const router = express.Router();
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout,getWorkoutAnalytics } = require('../controllers/workoutController');
const requireAuth=require('../middleware/requireAuth');

//require auth for all routes
router.use(requireAuth);

/**
 * Routes:/api/workouts
 * Method: GET
 * Description: Get all workouts
 * Access: Public
 * Parameters: None
 * Response: JSON object with a message "Get all workouts"  
 * 
 * 
 */
router.get('/', getWorkouts)

/**
 * Routes:/api/workouts/:id
 * Method: GET
 * Description: Get a single workout by its ID
 * Access: Public
 * Parameters: id (string) - The ID of the workout to retrieve
 * Response: JSON object with a message "Get workout by ID"  
 * 
 * 
 */
router.get('/:id', getWorkout)

/**
 * Routes for workouts :/api/workouts
 * Method: POST
 * Description: Create a new workout
 * Access: Public
 * Parameters: None
 * Response: JSON object with a message "Create a new workout"  
 */
router.post('/', createWorkout)

/**
 * Routes for workouts :/api/workouts/:id
 * Method: DELETE
 * Description: Delete a workout by ID
 * Access: Public
 * Parameters: id (string) - The ID of the workout to delete
 * Response: JSON object with a message "Delete workout by ID"  
 */
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', requireAuth, updateWorkout);

/**
 * Routes for workouts :/api/workouts/:id
 * Method: PATCH
 * Description: Update a workout by ID
 * Access: Public
 * Parameters: id (string) - The ID of the workout to update
 * Response: JSON object with a message "Update workout by ID"
 * */
router.patch('/:id', updateWorkout);

router.get('/analytics/summary', getWorkoutAnalytics);
router.get('/:id', getWorkout);

module.exports = router;