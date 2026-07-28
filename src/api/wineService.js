import api from "./axios";

export const getWines = async () => {
    const { data } = await api.get('/wines')
    return data
}