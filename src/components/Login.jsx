import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState('');
    const [login,setLogin] = useState(true);
    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async() => {
       
        try {
            const res = await axios.post(BASE_URL+"/login",{
                emailId,
                password
            },{withCredentials:true})
            dispatch(addUser(res.data));
            localStorage.setItem("user", JSON.stringify(res.data));
            return navigate("/");
        }catch(e) {
            console.log(e);
            setError(e.message);
        }
    }   
  const handleSignUp = async() => {
    try{
        const newuser = await axios.post(BASE_URL+"/signup",{
            firstName,
            lastName,
            emailId,
            password,
            age
        }, {withCredentials:true});
        dispatch(addUser(newuser.data.data));
        navigate('/profile');
    }catch(e) {
        console.log(e);
        setError(e.message);
    }
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
            <h2 className="card- justify-center">{login ? "Login" : "Signup"}</h2>
            <div>
            {!login && <><label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">FirstName</span>
                </div>
                <input type="text" value={firstName}
                 className="input input-bordered w-full max-w-xs" 
                 onChange={(e)=>setFirstName(e.target.value)}/>
                <div className="label">
                  
                </div>
            </label>
            <label className="form-control w-full max-w-xs my-1">
                <div className="label">
                    <span className="label-text">LastName</span>
                </div>
                <input type="text" value ={lastName}
                className="input input-bordered w-full max-w-xs" 
                onChange={(e)=>setLastName(e.target.value)}/>
                <div className="label">
                   
                </div>
            </label>
            <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                    <span className="label-text">Age</span>
                </div>
                <input type="text" value={age}
                 className="input input-bordered w-full max-w-xs" 
                 onChange={(e)=>setAge(e.target.value)}/>
                <div className="label">
                  
                </div>
            </label>
            </>}
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
            <p className ="text-red-500"> {error}</p>
            {login ?<p className ="cursor-pointer" onClick={(e)=>setLogin(false)}>Click here to Sign up</p> :
            <p className ="cursor-pointer" onClick={(e)=>setLogin(true)}>Click here to Login</p>
            }
            <div className="card-actions justify-center">
            {login?<button className="btn btn-primary" onClick={handleLogin}>Login</button>:
            <button className="btn btn-primary" onClick={handleSignUp}>Signup</button>}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login
