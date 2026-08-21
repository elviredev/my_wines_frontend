import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const ProtectedRoute = () => {
  
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    // Pendant la vérification du token avec /api/me
    if(loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-950">
                <p className="text-stone-300">Vérification de la session...</p>
            </div>
        )
    }

    // Pas connecté → login
    if(!isAuthenticated) {
        return (
            <Navigate
                to="/login"            
                replace
                state={{ from: location }}
            />
        )
    }

    // Connecté → accès à la route demandée
    return <Outlet />

}

export default ProtectedRoute