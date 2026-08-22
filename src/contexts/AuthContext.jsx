// @ts-nocheck

import { createContext, useContext, useEffect, useState } from "react"

import { login as loginApi, logout as logoutApi, getMe } from "@/api/auth"

const AuthContext = createContext(null)

// Permet à toute l'application de connaître l'état de connexion. 
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    // Récupère le token actuellement stocké
    const getToken = () => {
        return (
            localStorage.getItem("token") ||
            sessionStorage.getItem("token")
        )
    }

    // Connexion
    const login = async (email, password, remember = false) => {
        const data = await loginApi({
            email,
            password
        })

        const { token, user } = data

        // On supprime d'abord un éventuel ancien token
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")

        // On choisit où stocker le nouveau token
        if (remember) {
            localStorage.setItem("token", token)
        } else {
            sessionStorage.setItem("token", token)
        }

        setUser(user)

        return user
    }

    // Déconnexion
    const logout = async () => {
        try {
            // On prévient Laravel pour révoquer le token
            await logoutApi()
        } catch (error) {
            // Même si l'API échoue, on nettoie la session côté React
            console.error("Erreur lors de la déconnexion : ", error)
        } finally {
            // Même si Laravel rencontre une erreur pendant le logout, on nettoie quand même le token côté navigateur
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");

            setUser(null);
        }
    }

    // Vérification de la session au demarrage
    useEffect(() => {

        const checkAuth = async () => {

            const token = getToken()

            if (!token) {

                setLoading(false)
                return;
            }

            try {

                const user = await getMe()

                setUser(user)

            } catch (error) {

                // Token invalide ou expiré
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");

                setUser(null);

            } finally {

                setLoading(false);

            }
        }

        checkAuth()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center app-background">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-rose-400 border-t-transparent animate-spin" />

                    <p className="text-sm text-stone-400">
                        Chargement...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

/**
 * Hook permettant d'utiliser l'authentification
 * dans n'importe quel composant.
 */
export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth doit être utilisé à l'intérieur de AuthProvider"
        );
    }

    return context;
}