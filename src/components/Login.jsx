import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {
    const [emailId, setEmailId] = useState("dhiva@gmail.com");
    const [password, setPassword] = useState("Dhivya@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async() => {
       
        try {
        const res = await axios.post(BASE_URL+"/login",{
            emailId,
            password
        },{withCredentials:true})
        dispatch(addUser(res.data));
        return navigate("/");
        }catch(e) {
            console.log(e);
        }
    }   
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
            <h2 className="card- justify-center">Login</h2>
            <div>
            <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">Email ID</span>
                </div>
                <input type="text" value={emailId}
                 className="input input-bordered w-full max-w-xs" 
                 onChange={(e)=>setEmailId(e.target.value)}/>
                <div className="label">
                   
                </div>
            </label>
            <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                    <span className="label-text">Password</span>
                    
                </div>
                <input type="password" value ={password}
                className="input input-bordered w-full max-w-xs" 
                onChange={(e)=>setPassword(e.target.value)}/>
                <div className="label">
                   
                </div>
            </label>
            </div>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login
