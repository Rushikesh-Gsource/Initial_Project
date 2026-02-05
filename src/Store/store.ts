import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./Slices/blogSlice.ts";

// used to configure the store
export const Store = configureStore({
    reducer: {
        blog: blogReducer,
    }
})

// used to get the state from the store
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store
