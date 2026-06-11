const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')   // 🔥 ADD THIS

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// 🔥 IMPORTANT: CORS MUST BE FIRST MIDDLEWARE
app.use(cors({
  origin: "https://workout-buddy-aayushi.netlify.app",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  allowedHeaders: '*'
}));

app.options("*", cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// DB
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(err))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})