// src/apiService.js
import axiosInstance from './axios';

export const apiRequest = async (method, url, data = null, config = {}) => {
    try {
        //const token = localStorage.getItem('token'); // Retrieve token from local storage or other storage
        const response = await axiosInstance({
            method,
            url,
            data,
            // headers: {
            //     Authorization: token ? `Bearer ${token}` : '', // Add token if available
            // },
            ...config, // Spread any additional configuration options
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};