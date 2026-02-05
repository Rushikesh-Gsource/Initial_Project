import { useSelector, useDispatch } from "react-redux"
import { deleteBlog as deleteBlogAction } from "../Store/Slices/blogSlice"
import { useNavigate } from "react-router-dom"

export default function BlogList() {
    const blogs = useSelector((state: any) => state.blog.blogs)
    const user = useSelector((state: any) => state.blog.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (e: React.MouseEvent, id: any) => {
        e.stopPropagation()
        dispatch(deleteBlogAction(id))
    }

    const handleCardClick = (id: any) => {
        navigate(`/blog/${id}`)
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                {blogs && blogs.map((blog: any) => (
                    <div key={blog.id} className="col-12 col-md-4">
                        <div className="card h-100 p-4 border" onClick={() => handleCardClick(blog.id)} >
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title"><strong>{blog.title}</strong></h3>
                                <br />
                                <p className="card-text text-muted">
                                    {blog.name}
                                </p>
                                <br />
                                <p className="card-text text-muted">
                                    {blog.body}
                                </p>
                                <br />

                                {user && user.title === "Creator" && (
                                    <button
                                        className="btn btn-outline-danger btn-sm mt-auto align-self-start"
                                        onClick={(e) => handleDelete(e, blog.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}