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
      }
    ]
  },
  {
    path: "/verify",
    element: <Verify />
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
