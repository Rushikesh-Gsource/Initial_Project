import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBlog } from "../Store/Slices/blogSlice"
import { useParams, useNavigate } from "react-router-dom"

export default function EditBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const blogs = useSelector((state: any) => state.blog.blogs)
    const handleUpdate = () => {
        dispatch(updateBlog({ id, title, body, name }))
        navigate("/bloglist")
    }


    useEffect(() => {
        const blog = blogs.find((blog: any) => blog.id === id)
        if (blog) {
            setTitle(blog.title)
            setBody(blog.body)
            setName(blog.name)
        }
    }, [id, blogs])

    return (
        <>
            <div className="container py-5">
                <h2 className="text-center mb-4">Update Blog</h2>

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
                            className="form-control form-control-lg mb-3"
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
                        <input className="form-control form-control-lg mb-3" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Author" />
                        <br />

                        <button className="btn btn-outline-primary btn-lg" onClick={handleUpdate}>Update Blog</button>

                    </div>
                </div>
            </div>

        </>
    )
}