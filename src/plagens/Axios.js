import axios from "axios";


const https = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})
https.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("token")
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        config.headers["language"] = localStorage.getItem("lang");
        config.headers["Accept"] = "application/json";
        return config;
    },
    (error) => Promise.reject(error)
)

export default https