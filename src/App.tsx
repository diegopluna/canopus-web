import { ThemeProvider } from "@/components/theme-provider"
import SignIn from "./pages/SignIn"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SignIn />
    </ThemeProvider>
  )
}

export default App
