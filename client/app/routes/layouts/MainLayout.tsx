import { Outlet } from "react-router"
import { Footer } from "../../components/Footer"
import { useTheme } from "../../hooks/useTheme"
import { Navbar } from "../../components/Navbar"

export default function MainLayout() {
  const { themeToggle } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-surface text-content">
      <Navbar themeToggle={themeToggle} />

      <main className="flex-1 flex flex-col justify-center items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
