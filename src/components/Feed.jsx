import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  if(userData) return;
  async function userDataCall() {

    try {
      const res = await axios.post(BASE_URL+"/profile",{},{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    }
    catch(err) {
      if(err.status === 401) {
       navigate('/login');
      }
      console.error(err);
    }
  }
  useEffect(() => {
    userDataCall();
  },[])
  return (
    <div>
      feed
    </div>
  )
}

export default Feed
