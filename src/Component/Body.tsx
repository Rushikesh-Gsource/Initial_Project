import { useDispatch } from "react-redux"
import { addBlog } from "../blogSlice"
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
            <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" />
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Body" />

                <button onClick={handleAddBlog}>Add Blog</button>
            </div>
        </>
    )
}