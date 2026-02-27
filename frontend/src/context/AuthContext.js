// Added useEffect to the import line below
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });   

    // This checks localStorage when the component first renders
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // If a user exists in storage, log them back in automatically
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []); // Empty dependency array means this runs once on load
  
    console.log("AuthContext state:", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}