import React from 'react'
import { useState } from 'react';
import Card from './Card';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux'; // Make sure to import useDispatch

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age);
    const [photourl, setPhotoUrl] = useState(user.photoURL);
    const [description, setDescription] = useState(user.description);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch(); // Move useDispatch hook here

    const saveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                gender,
                photoURL: photourl,
                description,
                age
            }, { withCredentials: true });

            // Now call dispatch inside the function, no hook call here
            dispatch(addUser(res?.data?.userdetails)); // Call dispatch correctly here
           setShowToast(true);
            const i = setTimeout(() => {
                setShowToast(false);
            },3000);
            
        } catch (err) {
            setError(err.response.data || 'Something went wrong');
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card- justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input type="text" value={firstName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs my-1">
                                <input type="text" value={lastName}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setLastName(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs my-1">
                                <input type="text" value={gender}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setGender(e.target.value)} />
                            </label>
                            <label className="form-control w-full max-w-xs my-1">
                                <input type="text" value={photourl}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setPhotoUrl(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs my-1">
                                <input type="text" value={description}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setDescription(e.target.value)} />
                            </label>

                            <label className="form-control w-full max-w-xs my-1">
                                <input type="text" value={age}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setAge(e.target.value)} />
                            </label>
                        </div>
                        <p className="text-red-500"> {error}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Card user={{ firstName, lastName, age, gender, photoURL: photourl, description }} />
            {showToast && (<div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile saved.</span>
            </div>
            </div>)}
        </div>
    );
}

export default EditProfile;
