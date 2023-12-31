import AuthContext from "@/context/AuthProvider"
import { useContext, ReactNode } from "react"
import { Navigate, useLocation} from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("AuthContext is undefined");
        // TODO AJEITAR ISSO AI
    }
    const { user } = authContext;
    const location = useLocation().pathname

    return user ? (
        children
    ) : (
        <Navigate to={"/signin"} state={{from: location}} replace />
    )

}

export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("AuthContext is undefined");
        // TODO AJEITAR ISSO AI
    }
    const { user } = authContext;
    const location = useLocation().pathname


    return !user ? (
        children
    ): (
        <Navigate to={"/"} state={{from: location}} replace />
    )

}

export default ProtectedRoute;