import api from "./axios";

export const getWines = async (params = {}) => {
    const { data } = await api.get('/wines', {
        params
    })
    return data
}