import { useSelector, useDispatch } from "react-redux"
import { deleteBlog as deleteBlogAction } from "../Store/Slices/blogSlice"

export default function BlogList() {
    const blogs = useSelector((state: any) => state.blog.blogs)
    const user = useSelector((state: any) => state.blog.user)
    const dispatch = useDispatch()

    const handleDelete = (id: any) => {
        dispatch(deleteBlogAction(id))
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                {blogs && blogs.map((blog: any) => (
                    <div key={blog.id} className="col-12 col-md-4">
                        <div className="card h-100 p-4 border">
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title"><strong>{blog.title}</strong></h3>
                                <br />
                                <p className="card-text text-muted">
                                    {blog.body}
                                </p>
                                <br />
                                {user && user.title === "Creator" && (
                                    <button
                                        className="btn btn-outline-danger btn-sm mt-auto align-self-start"
                                        onClick={() => handleDelete(blog.id)}
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