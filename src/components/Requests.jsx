import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/RequestSlice'
import { use } from 'react'

const Requests = () => {
    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch();
    const fetchRequest = async() => {
        try {
            const requests_response = await axios.get(BASE_URL+"/request/pending", {
                withCredentials:true
            });
            console.log(requests)
            dispatch(addRequests(requests_response.data.data))
        } catch(e) {
           console.error(e.message);
        }
    }
    const handleRequests = async(reqStatus,id) => {
        try{
            const handleResponse = await axios.post(BASE_URL+"/request/review/"+reqStatus+"/"+id,{},{
                withCredentials: true
            });
            dispatch(removeRequest(id))
        } catch(e) {
           console.error(e.message);
        }
    }
  useEffect(() => {
    fetchRequest()
  },[])
  if(!requests) return;
    if(requests.length === 0) return <h1> No requests Found</h1>;
  return (
    <div className='text-center my-10'>
        <h1 className="text-bold text-white text-3xl"> Requests </h1>
        {requests.map((request)=>{
            const {_id,firstName, lastName,photoURL, age, gender,description} = request.fromUserId;
            return (
                <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                    <div>
                        <img alt="photo"
                        className="w-20 h-20 rounded-full" src={photoURL}/>
                    </div>
                    <div className="text-left mx-4">
                        <h2 className ="font-bold text-xl">
                            {firstName+" "+lastName}
                        </h2>
                        {age && gender && <p>{age+" "+gender}</p>}
                        <p>{description}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary mx-10" onClick = {()=> handleRequests('accepted',_id)}>Accept</button>
                    <button className="btn btn-secondary">Reject</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Requests
