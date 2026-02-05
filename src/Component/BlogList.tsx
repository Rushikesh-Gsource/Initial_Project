import { useSelector, useDispatch } from "react-redux"
import { deleteBlog as deleteBlogAction } from "../blogSlice"

export default function BlogList() {
    const blogs = useSelector((state: any) => state.blog.blogs)
    const dispatch = useDispatch()
    const handleDelete = (id: any) => {
        dispatch(deleteBlogAction(id))
    }
    return (
        <>
            <ul>
                {blogs.map((blog: any) => (
                    <li key={blog.id}>
                        <h1>{blog.title}</h1>
                        <h1>{blog.id}</h1>
                        <button onClick={() => handleDelete(blog.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}