import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
    blogs: any[];
    user: any;
}

const initialState: BlogState = {
    blogs: [],
    user: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        addBlog: (state, action: PayloadAction<any>) => {
            state.blogs.push(action.payload)
        },
        deleteBlog: (state, action: PayloadAction<any>) => {
            state.blogs = state.blogs.filter((blog: any) => blog.id !== action.payload)
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        setBlogs: (state, action: PayloadAction<any[]>) => {
            state.blogs = action.payload
        }
    }
})

export const { addBlog, deleteBlog, setUser, setBlogs } = blogSlice.actions
export default blogSlice.reducer
