import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const GuestRoute = () => {
  
    const { isAuthenticated, loading } = useAuth()

    // Pendant la vérification du token avec /api/me
    if(loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-950">
                <p className="text-stone-300">Vérification de la session...</p>
            </div>
        )
    }

    // Déja connecté → Dashboard
    if(isAuthenticated) {
        return (
            <Navigate to="/dashboard" replace />
        )
    }

    // Pas connecté → accès à /login
    return <Outlet />

}

export default GuestRoute