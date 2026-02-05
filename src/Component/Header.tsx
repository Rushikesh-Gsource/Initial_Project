
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../Store/Slices/blogSlice'
import "./Header.css"

export default function Header() {
    const user = useSelector((state: any) => state.blog.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch(setUser(null))
        navigate("/")
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg app-navbar sticky-top">
                <div className="container-fluid px-4">
                    <div className="navbar-brand d-flex align-items-center brand" >
                        <img src={logo} alt="logo" className="brand-logo" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto nav-links">
                            {!user ? (
                                <>
                                    <Link className="nav-link" to="/">Login</Link>

                                </>
                            ) : (
                                <>
                                    {user.title === "Creator" && (
                                        <Link className="nav-link" to="/body">Add Blog</Link>
                                    )}
                                    <Link className="nav-link" to="/bloglist">Blog List</Link>
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </>
                            )}
                        </div>
                        {user && (
                            <div className="user-area">
                                <span className="user-name">
                                    Hello,{user.name}
                                </span>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header >
    )
}
