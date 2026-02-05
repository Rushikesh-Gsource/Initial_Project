
import BlogList from './Component/BlogList'
import './App.css'
import Body from './Component/Body'
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Header from './Component/Header'
import Signup from './Component/Signup'
import Dashboard from './Component/Dashboard'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, setBlogs } from './Store/Slices/blogSlice'
import axios from 'axios'

import ProtectedRoute from './Guards/ProtectedRoute'
import BlogDetail from './Component/BlogDetail'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)))

      axios.get("http://localhost:5000/Blogs").then((res) => {
        dispatch(setBlogs(res.data));
      }).catch(err => console.error("Error fetching blogs:", err));
    }
  }, [dispatch])

  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Route>

        <Route element={<ProtectedRoute allowedTitles={['Creator']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/body" element={<Body />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App