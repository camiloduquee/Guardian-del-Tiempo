import { instanceAuth } from "./axios"
import { FormLogin, } from "../types"
import axios from "axios"
const BD_URL = import.meta.env.VITE_BD_URL



const endpointLogin = "/api/v1/auth/login"
const endpointSignUp = "/api/v1/auth/register"
const endpointProjets = "/api/v1/project"


const axiosWithOutCredentials = instanceAuth({ credential: false });
// const axiosWithCredentials = instanceAuth({ credential: true });

// RUTAS PARA INICIAR SESIÓN Y REGISTRARSE

export const loginRequest = async (data: FormLogin) => {
    return await axiosWithOutCredentials.post(endpointLogin, data)
}
export const registerRequest = async (data: any) => {
    return await axiosWithOutCredentials.post(endpointSignUp, data)
}

// RUTAS DE PROYECTOS CON CREDENCIAL

export const projectsRequest = async (cookies: any) => {
    return await axios.get(`${BD_URL}${endpointProjets}`, {
        withCredentials: true,
        xsrfCookieName: cookies,
        xsrfHeaderName: "token",
        headers: {
            cookie: cookies
        }

    })

}



