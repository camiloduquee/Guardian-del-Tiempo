import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { jwtDecode } from 'jwt-decode';
import { AuthContextType, User } from "../types";
import Cookies from "js-cookie"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
 
  const [validate, setValidate] = useState(false)
  const [user, setUser] = useState<User | null>(() => {

    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    setValidate((validate) => validate === false)
  }


  // Arreglar validacion con token desde el back-end: pendiente crear ruta o middleware
  const isAuthenticated = () => {
    // const delet = localStorage.removeItem('user');
    // const token = Cookies.get('token');
    
    
   
    
    if (!validate) {
      setValidate(false)
      return false;
    }
    // try {
    //   // const decoded = jwtDecode(token);
    //   // if (decoded.exp && decoded.exp * 1000 < Date.now()) {
    //   //   delet
    //   //   return false
    //   // }
    //   return true;
    // } catch (error) {
    //   delet
    //   return false;
    // }
    return true
  };

  return (
   
      <AuthContext.Provider value={{ user, isAuthenticated, logout, setValidate }}>
        {children}
      </AuthContext.Provider>
    
  )

}

export const useAuthUser = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context

}
