import { ThemeProvider } from "@/components/theme-provider"
import SignIn from "@/pages/SignIn"
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SignIn />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
