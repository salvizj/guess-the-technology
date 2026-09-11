import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { RegisterSchema } from "../schemas/registerSchema"
import type { LoginSchema } from "../schemas/loginSchema"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

type AuthContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  handleLogin: (data: LoginSchema) => Promise<void>
  handleRegister: (data: RegisterSchema) => Promise<void>
  handleLogout: () => Promise<void>
  handleVerifyJWT: () => Promise<void>
  isAdmin: boolean
  isLoading: boolean
  error: string | null
  userId: number | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [isVerifying, setIsVerifying] = useState<boolean>(true)
  const {
    error,
    isLoading: authHookLoading,
    executeLogin,
    executeRegister,
    executeLogout,
    executeVerifyJWT,
  } = useAuth()

  const handleVerifyJWT = async () => {
    try {
      const res = await executeVerifyJWT()
      setUserId(res.userId)
      setIsAuthenticated(Boolean(res && res.isValid))
      setIsAdmin(Boolean(res && (res.isAdmin === 1 || res.isAdmin === true)))
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    handleVerifyJWT()
  }, [])

  const handleLogin = async (data: LoginSchema) => {
    try {
      const res = await executeLogin(data)
      setUserId(res.userId)
      setIsAuthenticated(true)
      setIsAdmin(
        Boolean(res?.user?.isAdmin === 1 || res?.user?.isAdmin === true),
      )
      navigate("/", { replace: true })
    } catch (error) {
      setIsAuthenticated(false)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await executeLogout()
      navigate("/login", { replace: true })
      setIsAuthenticated(false)
    } catch (error) {
      throw error
    } finally {
      setIsAuthenticated(false)
      setIsAdmin(false)
      navigate("/login", { replace: true })
    }
  }

  const handleRegister = async (data: RegisterSchema) => {
    try {
      await executeRegister(data)
      navigate("/login")
    } catch (error) {
      throw error
    }
  }
  console.log("auth", isAdmin, userId)
  return (
    <AuthContext.Provider
      value={{
        isLoading: authHookLoading || isVerifying,
        error,
        userId,
        isAuthenticated,
        setIsAuthenticated,
        handleLogout,
        handleLogin,
        handleRegister,
        handleVerifyJWT,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }

  return context
}
