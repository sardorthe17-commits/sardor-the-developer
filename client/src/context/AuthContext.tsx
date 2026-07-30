import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { loginAdmin } from '../api/client'

interface AuthContextValue {
  isAdmin: boolean
  isLoggingIn: boolean
  loginError: string | null
  login: (login: string, parol: string) => Promise<boolean>
  logout: () => void
  clearLoginError: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const STORAGE_KEY = 'std_admin_session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === '1',
  )
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const login = useCallback(async (loginValue: string, parol: string) => {
    setIsLoggingIn(true)
    setLoginError(null)
    try {
      const res = await loginAdmin(loginValue, parol)
      if (res.success) {
        localStorage.setItem(STORAGE_KEY, '1')
        setIsAdmin(true)
        return true
      }
      setLoginError(res.message || "Login yoki parol noto'g'ri")
      return false
    } catch {
      setLoginError('Serverga ulanib bo\'lmadi. Backend ishga tushirilganini tekshiring.')
      return false
    } finally {
      setIsLoggingIn(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setIsAdmin(false)
  }, [])

  const clearLoginError = useCallback(() => setLoginError(null), [])

  return (
    <AuthContext.Provider
      value={{ isAdmin, isLoggingIn, loginError, login, logout, clearLoginError }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth AuthProvider ichida ishlatilishi kerak')
  return ctx
}
