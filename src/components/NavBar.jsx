import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { useNavigate, Link } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
const NavBar = () => {

  const User = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL+"/logout",{},{
        withCredentials :true,});
       
      dispatch(removeUser());
      return navigate("/login");
    }
    catch (err) {

    }
  }
  console.log(User);
  return (      
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl"><Link to="/">🧑‍💻Dev Tinder</Link></a>
        </div>
        <div className="flex-none gap-2">
          {User && ( 
            <div className="dropdown dropdown-end mx-5 flex">
              <p className ="px-4"> 
                 welcome {User.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={User.photoURL} />
              </div>
            </div> 
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  <Link to="/Profile">Profile</Link>
                  <span className="badge">New</span>
                </a>
              </li>
              <li><Link to="/Connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div> )}
        </div>
      </div>
  )
}

export default NavBar
