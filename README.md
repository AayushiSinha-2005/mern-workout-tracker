# Workout Buddy - Full Stack MERN App
Workout Buddy is a comprehensive fitness tracking application built using the MERN stack. It allows users to manage their workout routines efficiently while providing real-time data insights.

The project features a highly interactive dashboard with Real-time Analytics and a seamless Dark/Light Mode toggle, ensuring a premium user experience.
---
# Tech Stack
- React.js – Frontend structure using Functional Components and Hooks
- Node.js & Express.js – Backend logic and robust RESTful API architecture
- MongoDB & Mongoose – NoSQL database management and schema modeling
- Context API – Global state management for Authentication and Workouts
- JWT & Bcrypt – Secure user sessions and password hashing for authentication
- CSS3 – Custom styling, dark mode implementation, and responsive layout
  
# 📸 Screenshots

| ☀️ Light Mode Dashboard | 🌙 Dark Mode Dashboard |
| :---: | :---: |
| ![Light Mode](https://github.com/user-attachments/assets/ba708dc6-d8a3-4574-b118-7caa4d6ca60b) | ![Dark Mode](https://github.com/user-attachments/assets/4c531a9e-25bc-4744-aae0-d0e785def41e) |

> **Dashboard Analytics**: Features a custom-built theme provider for Dark/Light mode and real-time workout tracking.
> 
# Features
- Smart Analytics: Real-time calculation of Total Volume, Workouts, and Most Trained muscle groups.
- Theme Toggle: Seamless switching between Dark and Light modes for enhanced UI/UX.
- Secure Auth: Protected routes with robust Signup/Login functionality using JWT.
- Dynamic CRUD: Instant UI updates when adding or deleting workout entries.
- Categorized Filters: Effortlessly filter and view workout history by specific muscle groups.
  
# Project Structure
```
MERN-WORKOUT-TRACKER/
├── backend/            → Server-side logic, Controllers, and Database Models
│   ├── models/         → Data schemas for Workouts and Users
│   └── routes/         → Express API endpoints
│
├── frontend/           → Client-side React application
│   ├── src/context/    → Global state management (Auth & Workouts)
│   └── src/pages/      → Responsive UI components and Dashboards
```

# API Endpoints
The backend exposes the following RESTful endpoints for data management:
- GET   /api/workouts     — Retrieve all logged workouts.
- POST   /api/workouts     — Create and store a new workout entry.
- GET    /api/workouts/:id — Fetch details for a specific workout.
- DELETE /api/workouts/:id — Remove a workout from the database.
  
##Contributing

1.Fork the repository.
2.Create a feature branch: 

```bash
git checkout -b feature/new-feature
```
3.Commit your changes:
```bash
git commit -m "Add new feature".
```
4.Push to the branch and open a Pull Request.
```bash
git push origin feature/new-feature
```

## License
This project is licensed under the **MIT License**.

## Contact

Maintainer: [@AayushiSinha-2005](https://github.com/AayushiSinha-2005)
Email: [jiyasinha2055@gmail.com](mailto:jiyasinha2055@gmail.com)

<p align="center">
<sub>Built with ❤️ and the MERN Stack by <a href="mailto:jiyasinha2055@gmail.com">Aayushi Sinha</a>.</sub>
</p>





















