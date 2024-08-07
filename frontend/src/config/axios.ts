import axios from "axios";

const BASEURL = "https://quickdeck.up.railway.app/api/";

const api = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {
                await api.post("/token/refresh/");
                return api(error.config);
            } catch (error) {
                console.error("Error refreshing token:", error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
