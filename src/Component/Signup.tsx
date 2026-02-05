import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    /**
     * @description This component is used to display the signup page
     * @returns {JSX.Element}
     */
    // navigate is used to navigate to the blog list page
    const navigate = useNavigate();
    // submitSignup is used to submit the signup form
    const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // get the form data and trim it and store it in variables
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();
        const name = formData.get("name")?.toString().trim();
        const title = formData.get("title")?.toString().trim();
        // if email or password or any thing is empty, show alert
        if (!email || !password || !name || !title) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // try to signup
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
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Signup</h3>
                                <form onSubmit={submitSignup}>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input name="email" type="email" className="form-control form-control-lg mb-3" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input name="password" type="password" className="form-control form-control-lg mb-3" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input name="name" type="text" className="form-control form-control-lg mb-3" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input name="title" type="text" className="form-control form-control-lg mb-3" placeholder="Creator/Reader" required />
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary btn-lg">Signup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}