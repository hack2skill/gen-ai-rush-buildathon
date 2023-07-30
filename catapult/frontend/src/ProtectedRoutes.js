import { Navigate, Outlet } from "react-router-dom";

const getIdToken = () => {
    return sessionStorage.getItem("idToken");
};

function ProtectedRoutes() {
    const id_token = getIdToken();
    return id_token ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes;