import React, { useContext, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authContext } from './Auth';

const Navbar = () => {
    const { setProject } = useContext(authContext)
    const [isOpen, setIsOpen] = useState(false)
    const [profileOrLogout, setProfileOrLogout] = useState("")
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true })

            if (response?.data?.msg == `logout`) {
                console.log(response?.data?.msg)
                toast.success(response?.data?.msg)
                navigate('/')
            }
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    }
    const handleSelect = (value) => {
        setProfileOrLogout(value)
    }

    if (profileOrLogout.includes("Profile")) console.log('showing profile')

    if (profileOrLogout.includes("Logout")) logout()


    const showProfile = () => { }


    return (
        <>
            <div className='flex justify-center p-4 bg-gray-800 gap-5 max-w-[60vw] items-center m-auto rounded-xl'>
                <select
                    className={`rounded-xl p-2 ${isOpen == true ? `show` : `hidden`}`}
                    value={profileOrLogout}
                    onChange={(e) => handleSelect(e.target.value)}
                >
                    <option>Select</option>
                    <option>👤Profile</option>
                    <option>🤝Logout</option>
                </select>
                <FaCircleUser className='text-white text-4xl hover:cursor-pointer hover:text-gray-400' onClick={() => setIsOpen(prev => !prev)} />
                <IoMdAddCircleOutline className='text-white text-4xl hover:cursor-pointer hover:text-gray-400'
                    onClick={() => navigate('/add-project')}
                />
                <FaHome
                    className='text-white text-4xl hover:cursor-pointer hover:text-gray-400'
                    onClick={() => {
                        navigate('/all-projects')

                    }}
                />

            </div>
        </>
    )
}

export default Navbar