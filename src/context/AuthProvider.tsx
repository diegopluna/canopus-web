import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface AuthTokensType {
    access: string;
    refresh: string;
}

export interface UserPayload extends JwtPayload {
    role: String;
    fullName: String;
    avatar: String;
}

interface AuthContextType {
    user: UserPayload | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserPayload | undefined>>;
    authTokens:AuthTokensType | undefined;
    setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokensType | undefined>>;
    loginUser: (email: string, password: string) => Promise<requestResponse>;
    registerUser: (data: registerData) => Promise<requestResponse>;
    logoutUser: () => Promise<void>;
    updateToken: () => Promise<void>;
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
    const [authTokens, setAuthTokens] = useState<AuthTokensType | undefined>(() =>{
        const storedAuthTokens = localStorage.getItem("authTokens");
        return storedAuthTokens ? JSON.parse(storedAuthTokens) : undefined;
    });
    const [user, setUser] = useState<UserPayload | undefined>(() => {
        const storedAuthTokens = localStorage.getItem("authTokens");
        return storedAuthTokens ? jwtDecode<UserPayload>(storedAuthTokens) : undefined;
    });
    
    const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://api-canopus.dpeter.tech"

    const navigate = useNavigate();

    const loginUser = async( email: string, password: string): Promise<requestResponse> => {
        const response = await axios.post(`${domain}/auth/signin`, {
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response)
                setAuthTokens(response.data);
                setUser(jwtDecode<UserPayload>(response.data.access));
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                navigate("/")
                return {status: response.status, message: "Logado com sucesso"}
            })
            .catch((error: Error | AxiosError) => {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    return {status: error.response?.status, message: error.message}
                }
                return {status: 404, message: "Não foi possível se conectar ao servidor."}
            })
        return response
    }

    const registerUser = async(data:registerData): Promise<requestResponse> => {
        const response = await axios.post(`${domain}/auth/signup`, data)
            .then((response) => {
                return {status: response.status, message: response.data.message}
            })
            .catch((error: Error | AxiosError) => {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    return {status: error.response?.status, message: error.response?.data.message}
                }
                return {message: "Não foi possível se conectar ao servidor."}
            })
        return response;
    }

    const logoutUser = async () => {
        //TODO : TIRAR OS TOKENS
        setAuthTokens(undefined)
        setUser(undefined)
        localStorage.removeItem('authTokens')
        navigate("/signin")
    }

    const updateToken =  async():Promise<void> => {
        console.log('Update token called')
        await axios.post(domain+'/api/token/refresh/',{
            refresh: authTokens?.refresh,
        })
        .then((response) => {
            if (response.status === 200) {
                setAuthTokens(response.data)
                setUser(jwtDecode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
            } else {
                logoutUser()
            }
        })
        .catch((error: Error | AxiosError) => {
            console.log(error)
            logoutUser()
        })
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
    }, [authTokens])

    const contextData: AuthContextType = {
        user: user,
        setUser: setUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
        updateToken: updateToken
    }

    return (
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    )
}