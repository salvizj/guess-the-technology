import { Link, NavLink } from "react-router"
import { ThemeToggler } from "./ThemeToggler"
import { useAuthContext } from "../context/useAuthContext"
import { Button } from "./base/Button"

type NavbarProps = {
  themeToggle: () => void
}

export const Navbar = ({ themeToggle }: NavbarProps) => {
  const { isAuthenticated, handleLogout, isAdmin } = useAuthContext()
  return (
    <header className="border-b border-border bg-surface-elevated px-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-content transition-colors hover:text-primary"
        >
          MyApp
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" end>
            {({ isActive }) => (
              <Button variant="ghost" isActive={isActive}>
                Home
              </Button>
            )}
          </NavLink>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <NavLink to="/admin">
                  {({ isActive }) => (
                    <Button variant="ghost" isActive={isActive}>
                      Admin
                    </Button>
                  )}
                </NavLink>
              )}
              <NavLink to="/quizzes" end>
                {({ isActive }) => (
                  <Button variant="ghost" isActive={isActive}>
                    Quizzes
                  </Button>
                )}
              </NavLink>
              <NavLink to="/profile" end>
                {({ isActive }) => (
                  <Button variant="ghost" isActive={isActive}>
                    Profile
                  </Button>
                )}
              </NavLink>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
              <ThemeToggler themeToggle={themeToggle} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login" end>
                {({ isActive }) => (
                  <Button variant="ghost" isActive={isActive}>
                    Login
                  </Button>
                )}
              </NavLink>
              <NavLink to="/register">
                {({ isActive }) => (
                  <Button variant="primary" isActive={isActive}>
                    Register
                  </Button>
                )}
              </NavLink>
              <ThemeToggler themeToggle={themeToggle} />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
