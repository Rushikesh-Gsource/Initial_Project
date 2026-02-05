import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function BlogDetail() {
    /**
     * @description This component is used to display the details of a blog
     * @returns {JSX.Element}
     */

    const { id } = useParams()
    const navigate = useNavigate()
    const blogs = useSelector((state: any) => state.blog.blogs)
    const blog = blogs.find((b: any) => b.id === id)

    if (!blog) {
        return (
            <div className="container mt-5">
                <h2>Blog not found</h2>
                <button className="btn btn-primary" onClick={() => navigate("/bloglist")}>Back</button>
            </div>
        )
    }

    return (
        <div className="container mt-5">
            <h1>{blog.title}</h1>
            <hr />
            <p>{blog.body}</p>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}
