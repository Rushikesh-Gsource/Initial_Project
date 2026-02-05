import { useSelector, useDispatch } from "react-redux"
import { deleteBlog as deleteBlogAction, updateBlog as updateBlogAction } from "../Store/Slices/blogSlice"
import { useNavigate } from "react-router-dom"

export default function BlogList() {
    /**
     * @description This component is used to display the list of blogs
     * @returns {JSX.Element}
     */
    const blogs = useSelector((state: any) => state.blog.blogs)
    const user = useSelector((state: any) => state.blog.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (e: React.MouseEvent, id: any) => {
        /**
         * @description This function is used to delete a blog
         * @param {React.MouseEvent} e
         * @param {any} id
         * @returns {void}
         */
        e.stopPropagation()
        dispatch(deleteBlogAction(id))
    }

    const handleCardClick = (id: any) => {
        /**
         * @description This function is used to navigate to the blog details page
         * @param {any} id
         * @returns {void}
         */
        navigate(`/blog/${id}`)
    }

    const handleUpdate = (e: React.MouseEvent, id: any) => {
        /**
         * @description This function is used to navigate to the edit blog page
         * @param {React.MouseEvent} e
         * @param {any} id
         * @returns {void}
         */
        e.stopPropagation()
        dispatch(updateBlogAction(id))
        navigate(`/edit-blog/${id}`)
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
                                <div className="d-flex gap-2">
                                    {/* ternary is used here inorder to show or hide the buttons based on the user role */}
                                    {user && user.title === "Creator" && (
                                        <button
                                            className="btn btn-outline-danger btn-sm mt-auto align-self-start"
                                            onClick={(e) => handleDelete(e, blog.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    {/* ternary is used here inorder to show or hide the buttons based on the user role */}
                                    {user && user.title === "Creator" && (
                                        <button
                                            className="btn btn-outline-primary btn-sm mt-auto align-self-start"
                                            onClick={(e) => handleUpdate(e, blog.id)}
                                        >
                                            Update
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}