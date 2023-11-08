import { createContext, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
// import axios from "axios";


interface AuthContextType {
    user: boolean;
    username:string
    loginUser: (email: string) => Promise<boolean>;
    logoutUser: () => Promise<void>;

}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext

export const AuthProvider = () => {
    const [username, setUsername] = useState("")
    
    // const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "http://canopus-api.dpeter.tech"

    const navigate = useNavigate();

    const loginUser = async( email: string): Promise<boolean> => {
        // try {
        //     const response = await axios.post(`${domain}/token/`, {
        //         email: email,
        //         password: password
        //     })

        //     if (response.status === 200) {
        //         //TODO SETAR OS TOKENS
        //         navigate("/")
        //         return true;
        //     }
        // } catch (error) {
        //     return false
        // }
        // return false;
        setUsername(email)
        return true
    }

    const logoutUser = async () => {
        //TODO : TIRAR OS TOKENS
        navigate("/signin")
    }

    const contextData: AuthContextType = {
        user: false,
        username: username,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    )
}