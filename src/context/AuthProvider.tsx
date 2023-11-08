import { createContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios";


interface AuthContextType {
    user: boolean;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logoutUser: () => Promise<void>;

}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext

export const AuthProvider = () => {
    
    const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "http://canopus-api.dpeter.tech"

    const navigate = useNavigate();

    const loginUser = async( email: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${domain}/token/`, {
                email: email,
                password: password
            })

            if (response.status === 200) {
                //TODO SETAR OS TOKENS
                navigate("/")
                return true;
            }
        } catch (error) {
            return false
        }
        return false;
    }

    const logoutUser = async () => {
        //TODO : TIRAR OS TOKENS
        navigate("/signin")
    }

    const contextData: AuthContextType = {
        user: false,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    )
}