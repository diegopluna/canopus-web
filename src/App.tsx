import { ThemeProvider } from "@/components/theme-provider"
import SignIn from "@/pages/SignIn"
import Chat from "./pages/Chat"
import { Toaster } from "@/components/ui/toaster"
import  { createBrowserRouter, RouterProvider} from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import ProtectedRoute, { PublicRoute } from "./utils/ProtectedRoute"
import SignUp from "./pages/SignUp"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "/",
        element: 
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      },
      {
        path: "/signin",
        element: 
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      },
      {
        path: "/signup",
        element:
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      }
    ]
  }
])

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
