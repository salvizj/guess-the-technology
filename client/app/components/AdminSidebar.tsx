import { NavLink } from "react-router"
import { Button } from "./base/Button"
import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Users,
} from "lucide-react"

export const AdminSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false)

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} className="shrink-0" />,
      end: true,
    },
    {
      path: "/admin/quizzes",
      label: "Manage Quizzes",
      icon: <FileText size={20} className="shrink-0" />,
      end: true,
    },
    {
      path: "/admin/quizzes/create",
      label: "Create Quiz",
      icon: <PlusCircle size={20} className="shrink-0" />,
      end: false,
    },
    {
      path: "/admin/users",
      label: "Manage Users",
      icon: <Users size={20} className="shrink-0" />,
      end: false,
    },
  ]

  return (
    <aside
      className={`${isMinimized ? "w-20" : "w-64"} min-h-screen bg-surface-elevated p-4 border-r border-border flex flex-col gap-2 transition-all duration-300`}
    >
      <Button variant="ghost" onClick={() => setIsMinimized((prev) => !prev)}>
        {isMinimized ? (
          <ArrowRight className="shrink-0" />
        ) : (
          <ArrowLeft className="shrink-0" />
        )}
      </Button>
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} end={item.end}>
          {({ isActive }) => (
            <Button
              variant="ghost"
              isActive={isActive}
              className={`flex items-center gap-3 w-full ${isMinimized ? "justify-center px-0" : "justify-start"}`}
            >
              {item.icon}
              {!isMinimized && <span>{item.label}</span>}
            </Button>
          )}
        </NavLink>
      ))}
    </aside>
  )
}
