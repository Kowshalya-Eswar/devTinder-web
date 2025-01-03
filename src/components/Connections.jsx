import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import axios from 'axios';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);  
    const loadConnections = async() => {
       
        try {
            const connecResponse = await axios.get(BASE_URL+"/connections", {
                withCredentials:true
            })
            console.log(connecResponse);
            
            dispatch(addConnections(connecResponse.data.data));
    
        } catch(e) {
            console.err(e.message);
        }
        
    };

    useEffect(() =>{
        loadConnections()
    },[]);

    if(!connections) return;
    if(connections.length === 0) return <h1> No connections Found</h1>;
  return (
    <div className='text-center my-10'>
        <h1 clasName="text-bold text-white text-5xl"> Connections </h1>
     {connections.map((connection)=>{
        const {firstName, lastName,photoURL, age, gender,description} = connection;
        return (
            <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
            </div>
        )
     })}
    </div>
  )
}

export default Connections
