import React from 'react'
import NavBar from "./NavBar"
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Body = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        dispatch(addUser(JSON.parse(storedUser)));
    }
}, []);

  return (
    <div>
      <NavBar/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
