import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setBlogs } from "../../blogSlice";
import { Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAllBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/Blogs");
            dispatch(setBlogs(res.data));
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    }

    const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();


        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:5000/Users?email=${email}&password=${password}`);
            if (res.data.length > 0) {
                const user = res.data[0];
                dispatch(setUser(user));
                localStorage.setItem("user", JSON.stringify(user));

                // Fetch blogs immediately after login
                await fetchAllBlogs();

                navigate("/body");
            } else {
                alert("Invalid email or password");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again later.");
        }
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <form onSubmit={submitLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input name="email" type="email" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input name="password" type="password" className="form-control" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                                <Link to="/signup">Not signed up? Signup Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}