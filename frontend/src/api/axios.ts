import axios, { AxiosInstance } from "axios";
const API_KEY = import.meta.env.VITE_API_KEY
const BD_URL = import.meta.env.VITE_BD_URL



const instanceAuth: AxiosInstance =
    axios.create({
        baseURL: BD_URL,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'apikey': API_KEY,
        }
    })




export default instanceAuth