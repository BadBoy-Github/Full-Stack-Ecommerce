import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e)=> {
        setUserRole(e.target.value)
    }
    
    const updateUserRole = async() => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({

                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-md'>

                <div className='placeCloseChangeUserRole'>
                <button className='block ml-auto p-1 bg-red-600 rounded-full hover:bg-red-800 absolute text-white' 
                onClick={onClose}>
                    <IoClose />
                </button>
                </div>
                <h1 className='pb-2 font-medium text-lg'>Change User Role</h1>

                <p>Name: {name}</p>
                <p>Email: {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role: </p>
                    <select className='border px-4 py-1 rounded' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='w-fit mx-auto block px-4 py-1 rounded-md bg-red-600 hover:scale-110 hover:bg-red-800 text-white' 
                onClick={updateUserRole}>
                    Change Role
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole