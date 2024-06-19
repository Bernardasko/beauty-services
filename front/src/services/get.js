import axios from "axios";
import { authenticate } from "../utils/auth/authenticate";
const API_URL = import.meta.env.VITE_API_URL;
const API_URC = import.meta.env.VITE_API_URC;
const API_URS = import.meta.env.VITE_API_URS;


export const getallData = async () => {
    try {
        authenticate();
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCategories = async () => {
    try {
        authenticate();
        const response = await axios.get(API_URC);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Users
export const getUsers = async () => {
    try {
        authenticate();
        const response = await axios.get(API_URS);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getSearchData = async (value) => {
    const response = await axios.get(`${API_URL}?title=${value}`)
    return response.data;
}