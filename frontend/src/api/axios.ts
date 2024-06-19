import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY
const BD_URL = import.meta.env.VITE_BD_URL


type InstanceType = {
    credential: boolean
}

const instanceAuth = ({ credential }: InstanceType) => {
    return axios.create({
        baseURL: BD_URL,
        withCredentials: credential,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'apikey': API_KEY,
        }
    })
}

const instanceCookie = (token: string) => {
    return axios.create({
        baseURL: BD_URL,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            cookie: `token=${token}`,
        },
        xsrfCookieName: 'token'
    })
}


export { instanceAuth, instanceCookie }