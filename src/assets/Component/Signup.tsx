import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();
        const name = formData.get("name")?.toString().trim();
        const title = formData.get("title")?.toString().trim();

        if (!email || !password || !name || !title) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post("http://localhost:5000/Users", {
                email,
                password,
                name,
                title
            })
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Signup</h5>
                                <form onSubmit={submitSignup}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input name="email" type="email" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input name="password" type="password" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                                        <input name="name" type="text" className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Title</label>
                                        <input name="title" type="text" className="form-control" placeholder="Creator/Reader" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Signup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}