import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
/**
 * @description This is the blog slice
 * @param {BlogState} state
 * @param {PayloadAction<any>} action
 * @returns {BlogState}
 */

// used to store the type of the state
interface BlogState {
    blogs: any[];
    user: any;
}

// used to store the initial state of the state
const initialState: BlogState = {
    blogs: [],
    user: null,
};

// used to create the slice of the state
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        // used to add a blog
        addBlog: (state, action: PayloadAction<any>) => {
            state.blogs.push(action.payload)
        },
        // used to delete a blog
        deleteBlog: (state, action: PayloadAction<any>) => {
            state.blogs = state.blogs.filter((blog: any) => blog.id !== action.payload)
        },
        // used to set the user
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        // used to set the blogs
        setBlogs: (state, action: PayloadAction<any[]>) => {
            state.blogs = action.payload
        },
        // used to update the blog
        updateBlog: (state, action: PayloadAction<any>) => {
            state.blogs = state.blogs.map((blog: any) => blog.id === action.payload.id ? action.payload : blog)
        }
    }
})

export const { addBlog, deleteBlog, setUser, setBlogs, updateBlog } = blogSlice.actions
export default blogSlice.reducer
