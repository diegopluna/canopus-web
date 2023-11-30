import { ThemeProvider } from "@/components/theme-provider"
import SignIn from "@/pages/SignIn"
import { Toaster } from "@/components/ui/toaster"
import  { createBrowserRouter, RouterProvider} from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import ProtectedRoute, { PublicRoute } from "./utils/ProtectedRoute"
import SignUp from "./pages/SignUp"
import Verify from "./pages/Verify"
import Home from "./pages/Home"
import { Sidebar } from "./components/sidebar"
import Chat from "./pages/Chat"
import VerifyCreate from "./pages/VerifyCreate"
import AdminPanel from "./pages/AdminPanel"
import ActiveProjects from "./pages/ActiveProjects"
import AllProjects from "./pages/AllProjects"
import AllSchools from "./pages/AllSchools"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "/",
        element: <Sidebar />,
        children: [
          {
            path: "/",
            element:
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          },
          {
            path: "/chat",
            element:
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          },
          {
            path: "/admin",
            element:
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          },
          {
            path: "/projs/active",
            element:
            <ProtectedRoute>
              <ActiveProjects />
            </ProtectedRoute>
          },
          {
            path: "/projs/all",
            element:
            <ProtectedRoute>
              <AllProjects />
            </ProtectedRoute>
          },
          {
            path: "/school/all",
            element:
            <ProtectedRoute>
              <AllSchools />
            </ProtectedRoute>
          }
        ]
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
      },
      {
        path: "/verify",
        element: 
        <PublicRoute>
          <Verify />
        </PublicRoute>
      },
      {
        path: "/verify_create",
        element: 
        <PublicRoute>
          <VerifyCreate />
        </PublicRoute>
      }
    ]
  },
  
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
