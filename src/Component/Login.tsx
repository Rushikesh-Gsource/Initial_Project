import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setBlogs } from "../Store/Slices/blogSlice";
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
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Login</h3>
                                <form onSubmit={submitLogin}>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input name="email" type="email" className="form-control form-control-lg mb-3" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input name="password" type="password" className="form-control form-control-lg mb-3" required />
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary btn-lg">Login</button>
                                </form>
                                <br />
                                <Link to="/signup">Not signed up? Signup Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}