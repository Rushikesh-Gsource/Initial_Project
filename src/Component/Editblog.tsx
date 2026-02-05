import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBlog } from "../Store/Slices/blogSlice"
import { useParams, useNavigate } from "react-router-dom"

export default function EditBlog() {
    /**
     * @description This component is used to edit a blog
     * @returns {JSX.Element}
     */
    // id is used to store the id of the blog
    const { id } = useParams()
    // navigate is used to navigate to the blog list page
    const navigate = useNavigate()
    // title is used to store the new title of the blog
    const [title, setTitle] = useState("")
    // body is used to store the new body of the blog
    const [body, setBody] = useState("")
    // name is used to store the new name of the blog
    const [name, setName] = useState("")
    // dispatch is used to send data here to the store
    const dispatch = useDispatch()
    // blogs is used to store the list of blogs
    const blogs = useSelector((state: any) => state.blog.blogs)
    // handleUpdate is used to send the updated blog to the store
    const handleUpdate = () => {
        dispatch(updateBlog({ id, title, body, name }))
        navigate("/bloglist")
    }

    // useEffect is used to fetch the blog
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