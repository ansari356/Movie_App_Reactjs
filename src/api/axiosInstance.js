// Import axios for making HTTP requests.
import axios from 'axios';

// Import query-string to stringify query parameters.
import queryString from 'query-string';

// Import API configuration (base URL and API key).
import apiConfig from './apiConfig';

// Create a customized axios instance.
const axiosInstance = axios.create({
    // Set the base URL for all requests.
    baseURL: apiConfig.baseUrl,

    // Define default headers for every request.
    headers: {
        'Content-Type': 'application/json'
    },

    // Automatically add the API key to every request's query parameters.
    paramsSerializer: params =>
        queryString.stringify({ ...params, api_key: apiConfig.apiKey })
});

// Add a request interceptor.
// This allows you to modify the request before it is sent (e.g., to add auth tokens).
axiosInstance.interceptors.request.use(async (config) => config);

// Add a response interceptor.
// If the response contains data, return just the data.
// Otherwise, return the full response object.
axiosInstance.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },

    // If an error occurs during the request, throw it to be caught by the caller.
    (error) => {
        throw error;
    }
);

// Export the configured axios instance so it can be reused across the project.
export default axiosInstance;
