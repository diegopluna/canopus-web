import { createContext, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from "axios";


interface AuthContextType {
    user: boolean;
    username:string
    loginUser: (email: string) => Promise<boolean>;
    registerUser: (data: registerData) => Promise<requestResponse>;
    logoutUser: () => Promise<void>;

}

type registerData = {
    fullName: string;
    email: string;
    phoneNumber: string;
    interests: string[];
    cep: string;
    streetNumber: number;
    complement: string;
    password: string;
  };

type requestResponse = {
    status?: number;
    message: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext

export const AuthProvider = () => {
    const [username, setUsername] = useState("")
    
    const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://api-canopus.dpeter.tech"

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

    const registerUser = async(data:registerData): Promise<requestResponse> => {
        const response = await axios.post(`${domain}/auth/signup`, data)
            .then((response) => {
                return {status: response.status, message: response.data.message}
            })
            .catch((error: Error | AxiosError) => {
                if (axios.isAxiosError(error)) {
                    return {status: error.response?.status, message: error.response?.data.message}
                }
                return {message: "Não foi possível se conectar ao servidor."}
            })
        return response;
    }

    const logoutUser = async () => {
        //TODO : TIRAR OS TOKENS
        navigate("/signin")
    }

    const contextData: AuthContextType = {
        user: false,
        username: username,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    )
}