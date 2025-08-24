import { useEffect, useState } from "react"
import { AuthContext, type AuthToken } from "./AuthContext"

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null)

  useEffect(() => {
    try {
      const authTkn = localStorage.getItem("auth_token")

      if (authTkn) {
        setAuthToken(authTkn)
      }
    } catch (error) {
      console.error("Failed to set authtoken from useEffect")
    }
  }, [])

  const signin = (token: string) => {
    localStorage.setItem("auth_token", token)
    setAuthToken(token)
  }

  const signout = () => {
    localStorage.removeItem("auth_token")
    setAuthToken(null)
  }

  const value: AuthToken = { authToken, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


