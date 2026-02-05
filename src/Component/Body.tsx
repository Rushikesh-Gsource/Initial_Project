import { useDispatch } from "react-redux"
import { addBlog } from "../Store/Slices/blogSlice"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Body() {


    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddBlog = async () => {
        const trimmedTitle = title.trim();
        const trimmedBody = body.trim();

        if (!trimmedTitle || !trimmedBody) {
            alert("Title and Body cannot be empty!");
            return;
        }

        const newBlog = {
            id: Date.now().toString(),
            title: trimmedTitle,
            body: trimmedBody
        };

        try {
            await axios.post("http://localhost:5000/Blogs", newBlog);
            dispatch(addBlog(newBlog));

            setTitle("");
            setBody("");
            alert("Blog added successfully!");
            navigate("/bloglist");
        } catch (err) {
            console.error("Error adding blog:", err);
            alert("Failed to save blog to server.");
        }
    }

    return (
        <>
            <div className="container py-5">
                <h2 className="text-center mb-4">Create Blog</h2>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">

                        <input
                            type="text"
                            className="form-control form-control-lg mb-3"
                            placeholder="Blog title"
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <textarea
                            className="form-control"
                            rows={12}
                            value={body}
                            onChange={(e) => {
                                setBody(e.target.value);
                                e.currentTarget.style.height = "auto";
                                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                            }}
                            placeholder="Write your blog here..."
                        />
                        <br />

                        <button className="btn btn-outline-primary btn-lg" onClick={handleAddBlog}>Add Blog</button>

                    </div>
                </div>
            </div>

        </>
    )
}