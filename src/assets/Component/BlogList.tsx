import { useSelector, useDispatch } from "react-redux"
import { deleteBlog as deleteBlogAction } from "../../blogSlice"

export default function BlogList() {
    const blogs = useSelector((state: any) => state.blog.blogs)
    const user = useSelector((state: any) => state.blog.user)
    const dispatch = useDispatch()
    const handleDelete = (id: any) => {
        dispatch(deleteBlogAction(id))
    }
    return (
        <>
            <div>
                {blogs.map((blog: any) => (
                    <div className="card" style={{ width: "18rem" }} key={blog.id}>
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <p className="card-text">{blog.body}</p>
                            {user.title === "Creator" && <button onClick={() => handleDelete(blog.id)}>Delete</button>}
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}