
import { useSelector, useDispatch } from 'react-redux'
import logo from '../logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../../blogSlice'

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/bloglist">
                        <img src={logo} alt="logo" width="40" height="40" className="me-2" />
                        <span className="fw-bold">BlogApp</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto">
                            {!user ? (
                                <>
                                    <Link className="nav-link" to="/">Login</Link>
                                    <Link className="nav-link" to="/signup">Signup</Link>
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
                            <div className="d-flex align-items-center">
                                <span className="navbar-text me-3">
                                    Hello,{user.name}
                                </span>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
