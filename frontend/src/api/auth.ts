import instanceAuth from "./axios"
import { FormLogin, } from "../types"

const endpointLogin = "/auth/login"
const endpointSignUp = "/auth/register"
const endpointProjets = "/project"
const endpointTaskID = "/task/project"


// RUTAS PARA INICIAR SESIÓN Y REGISTRARSE

export const loginRequest = async (data: FormLogin) => {
    return await instanceAuth.post(endpointLogin, data)
}
export const registerRequest = async (data: any) => {
    return await instanceAuth.post(endpointSignUp, data)
}

// RUTAS DE PROYECTOS CON CREDENCIAL

export const projectsRequest = async () => {
    return await instanceAuth.get(endpointProjets)
}

//  TASK ENDPOINT + WITH COOKIES CREDENTIAL

export const tasksProjectIdRequest = async (project_uuid: string | null) => {
    return await instanceAuth.get(`${endpointTaskID}/${project_uuid}`)
}



