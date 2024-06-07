import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_WEB_KEY, // Use environment variable for security
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
