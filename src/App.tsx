
import BlogList from './assets/Component/BlogList'
import './App.css'
import Body from './assets/Component/Body'
import { Route, Routes } from 'react-router-dom'
import Login from './assets/Component/Login'
import Header from './assets/Component/Header'
import Signup from './assets/Component/Signup'
import Dashboard from './assets/Component/Dashboard'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, setBlogs } from './blogSlice'
import axios from 'axios'

import ProtectedRoute from './assets/Component/ProtectedRoute'

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
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/bloglist" element={<BlogList />} />
        </Route>

        <Route element={<ProtectedRoute allowedTitles={['Creator']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/body" element={<Body />} />
        </Route>
      </Routes>
    </>
  )
}

export default App