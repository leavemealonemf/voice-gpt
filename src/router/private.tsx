import { Outlet, Navigate } from "react-router-dom";

const PrivateRouter = () => {

    const token = localStorage.getItem('token');

    return (
        token ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default PrivateRouter