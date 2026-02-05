import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
    allowedTitles?: string[];
}
/**
 * @description This component is used to protect the routes
 * @param {ProtectedRouteProps} props
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ allowedTitles }: ProtectedRouteProps) => {
    // user is used to get the user from the store
    const user = useSelector((state: any) => state.blog.user);
    // savedUser is used to get the user from the local storage
    const savedUser = localStorage.getItem("user");

    // if user is not logged in, redirect to login page
    if (!user && !savedUser) {
        return <Navigate to="/" replace />;
    }

    // if user is logged in but not allowed, redirect to blog list page
    if (allowedTitles && user && !allowedTitles.includes(user.title)) {
        return <Navigate to="/bloglist" replace />;
    }

    // if user is logged in and allowed, render the protected route
    return <Outlet />;
};

export default ProtectedRoute;