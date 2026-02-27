import{useAuthContext} from './useAuthContext'
export const useLogout=()=>{
    const {dispatch}=useAuthContext();
/**
 * Removes the user from local storage.
 * This will log the user out of the application.
 * It is recommended to call this function when the user logs out of the application.
 */
    const logout=()=>{
        //remove user from local storage
        localStorage.removeItem('user');
        //update global auth context
        dispatch({type:'LOGOUT'})
    }
    return {logout}
}