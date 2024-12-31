import React from 'react'
import { useSelector } from 'react-redux';
const Card = ({user}) => {
    console.log(user);
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
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interest</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Card
