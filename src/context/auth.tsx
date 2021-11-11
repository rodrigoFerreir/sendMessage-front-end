import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api"
import { signInUrl } from "../services/oauth"


type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInURL: string;
    signOut: () => void;
}

type AuthProviderType = {
    children: ReactNode;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderType) => {

    const [user, setUser] = useState<User | null>(null)
    const signInURL = signInUrl

    const signIn = async (gitHubCode: string) => {
        const response = await api.post<AuthResponse>('autheticate', {
            code: gitHubCode,
        })
        const { token, user } = response.data

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user)
        if (user && token) {
            localStorage.setItem('@dowhile:token', token)
            localStorage.setItem('@dowhile:user', JSON.stringify(user))
        }
    }

    const signOut = () => {
        setUser(null);
        localStorage.clear()

    }

    useEffect(() => {
        const user = localStorage.getItem('@dowhile:user')
        const token = localStorage.getItem('@dowhile:token')
        if (token && user) {
            setUser(JSON.parse(user))
        }
    }, [])

    useEffect(() => {
        const url = window.location.href
        const hasGitHubCode = url.includes('?code=')

        if (hasGitHubCode) {
            const [urlWithoutCode, gitHubCode] = url.split('?code=')

            window.history.pushState({}, '', urlWithoutCode)

            signIn(gitHubCode)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signInURL, user, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}