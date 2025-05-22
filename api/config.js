import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_MOVIE_BASE_URL
    }
);
export default axiosInstance;