import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
    allowedTitles?: string[];
}

const ProtectedRoute = ({ allowedTitles }: ProtectedRouteProps) => {

    const user = useSelector((state: any) => state.blog.user);

    const savedUser = localStorage.getItem("user");


    if (!user && !savedUser) {
        return <Navigate to="/" replace />;
    }


    if (allowedTitles && user && !allowedTitles.includes(user.title)) {
        return <Navigate to="/bloglist" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;