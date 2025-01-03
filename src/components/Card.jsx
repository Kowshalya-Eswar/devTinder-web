import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
const Card = ({user}) => {
    console.log(user);
    const dispatch = useDispatch();
     const handleCards = async(reqStatus,id) => {
        try{
            await axios.post(BASE_URL+"/request/send/"+reqStatus+"/"+id,{},{
                withCredentials: true
            });
            dispatch(removeUserFromFeed(id))
        } catch(e) {
           console.error(e.message);
        }
    }
  return (
    <div>
        <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
            <img
            src={user.photoURL}
            alt="user image" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user.firstName +" "+user.lastName}</h2>
            <p>{user.description}</p>
            <p>{user.age+" "+user.gender}</p>
            <div className="card-actions justify-center my-4">
                <button className="btn btn-primary" onClick = {()=> handleCards('ignored',user._id)}>Ignore</button>
                <button className="btn btn-secondary" onClick = {()=> handleCards('interested',user._id)}>Interest</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Card
