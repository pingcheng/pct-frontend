import axios from "axios";

export const ApiClient = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 10000,
});