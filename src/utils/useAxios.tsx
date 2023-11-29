import AuthContext, {UserPayload} from "@/context/AuthProvider"
import axios from "axios"
import { useContext } from "react"
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'

const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://api-canopus.dpeter.tech"

const useAxios = () => {
    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const {authTokens, setUser, setAuthTokens} = authContext

    const axiosInstance = axios.create({
        baseURL: domain,
    })

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authTokens?.access}`
    
    axiosInstance.interceptors.request.use(async req => {
        const user: UserPayload = jwtDecode(authTokens?.access as string)
        const isExpired = dayjs.unix(user?.exp as number).diff(dayjs()) < 1;

        if (!isExpired) return req

        const response = await axios.post(`${domain}/auth/refresh`, {
            refresh: authTokens?.refresh
        })

        localStorage.setItem('authTokens', JSON.stringify(response.data));
        setAuthTokens(response.data)
        setUser(jwtDecode<UserPayload>(response.data.access));
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios