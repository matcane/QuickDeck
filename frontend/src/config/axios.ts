import axios from "axios";

const BASEURL = "http://127.0.0.1:8000/api/";

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
