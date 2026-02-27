import React from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = ({ darkMode, setDarkMode }) => {

  const {logout}=useLogout();  

  const {user}=useAuthContext();

  const handleClick = () => {
    logout();
  }
  return (
    <header>
        <div className="container">
             <Link to="/">
             <h1>Workout Buddy</h1>
             </Link>
             <nav>

         {/* // if user is logged in  */}
           {user && (
  <div>
    <span>{user.email}</span>

    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>

    <button onClick={handleClick}>Log out</button>
  </div>
)}
              {
                // if user is not logged in
                !user && (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>


                  </div>
                )
              }
             </nav>
            </div>
    </header>
  )
}
export default Navbar   