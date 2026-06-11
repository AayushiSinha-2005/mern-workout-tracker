const cors = require('cors');
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
//Routes
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

// ==================================
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
//=====================================

dotenv.config()

// express app
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(cors({
  origin: "https://workout-buddy-aayushi.netlify.app"
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// connect to db
mongoose.connect(process.env.MONGO_URI, { family: 4 }).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => console.log(err));
