import { useNavigate } from "react-router-dom"
import { registerRequest, loginRequest } from "../api/auth";
import type { FormLogin, FRWithoutConfirm, useRequestType } from "types";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
// import { useAuthUser } from "../context/auth-context";


const option = import.meta.env.VITE_COOKIE_OPTIONS


const useAuth = (): useRequestType => {

    // const { setCookie, cookies } = useAuthUser()


    const navigate = useNavigate();
    // const cookies = Cookies.get();
    const login = async (_data: FormLogin): Promise<void> => {
        const options = () => {
            if (option === 'ON') return { path: "/", secure: true } 
            return { path: "/" }
        }

        try {
            const { data, status } = await loginRequest(_data)

            if (status === 200) {
                Cookies.set('token', data.token, options)
                navigate('/dashboard')
            }

        } catch (error: any) {
            // Estado error.message ==> mensaje por defecto ('Usuario o contraseña incorrecta')
            toast.error("Usuario o contraseña incorrecta", { position: "bottom-right" });
        }
    }
    const signUp = async (_data: FRWithoutConfirm): Promise<void> => {
        console.log(_data)
        try {
            const { status } = await registerRequest(_data)
            if (status === 201) {
                navigate('/login')
            }

        } catch (error: any) {
            toast.error(error.response.data.message, { position: "bottom-right" });
        }
    }
    return { login, signUp }
}
export default useAuth