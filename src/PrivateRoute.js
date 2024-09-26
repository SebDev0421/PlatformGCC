import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children})=>{
    
    const credentials = JSON.parse(localStorage.getItem('credentials'))
    let logged = false
    if(credentials != null){
        if(!credentials.user.roll){
            logged = true
        }
    }
    
    
  
    return logged ? children: <Navigate to="/login"/>
}