import { Navigate, Outlet } from "react-router"
import { useAuthContext } from "../../context/useAuthContext"
import { AdminSidebar } from "../../components/AdminSidebar"

export default function AdminLayout() {
  const { isAuthenticated, isAdmin, isLoading } = useAuthContext()

  if (isLoading) return <div className="p-6">Loading...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return (
    <div className="flex w-full">
      <AdminSidebar />

      <section className="flex-1 p-6">
        <Outlet />
      </section>
    </div>
  )
}
