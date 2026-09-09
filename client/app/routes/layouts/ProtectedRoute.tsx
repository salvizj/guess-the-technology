import { Navigate, Outlet, useLocation } from "react-router"
import { useAuthContext } from "../../context/useAuthContext"

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthContext()
  const location = useLocation()

  if (isLoading) {
    return <div className="loading-spinner">Loading authentication...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
