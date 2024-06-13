import { useAuthUser } from '../context/auth-context';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
    
    const { isAuthenticated } = useAuthUser();

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />

}
export default ProtectedRoutes;