import api from "./axios";

// connexion
export const login = async (credentials) => {
    const { data } = await api.post("/login", credentials)

    return data
}

// deconnexion
export const logout = async () => {
    const { data } = await api.post("/logout")

    return data
}

// récupérer l'utilisateur connecté
export const getMe = async () => {
    const { data } = await api.get("/me")

    return data.data
}