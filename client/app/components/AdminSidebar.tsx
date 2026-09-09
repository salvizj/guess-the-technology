import { NavLink } from "react-router"
import { Button } from "./base/Button"

export const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-surface-elevated p-6 border-r border-border flex flex-col gap-2">
      <NavLink to="/admin" end>
        {({ isActive }) => (
          <Button variant="ghost" isActive={isActive}>
            Dashboard
          </Button>
        )}
      </NavLink>
      <NavLink to="/admin/quizzes" end>
        {({ isActive }) => (
          <Button variant="ghost" isActive={isActive}>
            Manage Quizzes
          </Button>
        )}
      </NavLink>
      <NavLink to="/admin/quizzes/create">
        {({ isActive }) => (
          <Button variant="ghost" isActive={isActive}>
            Create Quiz
          </Button>
        )}
      </NavLink>
      <NavLink to="/admin/users">
        {({ isActive }) => (
          <Button variant="ghost" isActive={isActive}>
            Manage Users
          </Button>
        )}
      </NavLink>
    </aside>
  )
}
