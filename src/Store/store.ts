import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./Slices/blogSlice.ts";

export const Store = configureStore({
    reducer: {
        blog: blogReducer,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store
