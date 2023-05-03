import React, { createContext, useState, useContext } from 'react'
import { UserType } from '../types/UserType'

type AuthContext = {
    user: undefined | UserType,
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
    logout: () => void
}

const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<undefined | UserType>()

    const logout = () => setUser(undefined)

    return (
        <AuthContext.Provider value={{ user, setUser , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUser = () => useContext(AuthContext)