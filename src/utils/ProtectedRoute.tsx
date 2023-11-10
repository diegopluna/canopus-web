import AuthContext from "@/context/AuthProvider"
import { useContext, ReactNode } from "react"
import { Navigate} from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
        // TODO AJEITAR ISSO AI
    }
    const { username } = authContext;

    return username ? (
        children
    ) : (
        <Navigate to={"/signin"} replace />
    )

}

export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
        // TODO AJEITAR ISSO AI
    }
    const { username } = authContext;

    return !username ? (
        children
    ): (
        <Navigate to={"/"} replace />
    )

}

export default ProtectedRoute;