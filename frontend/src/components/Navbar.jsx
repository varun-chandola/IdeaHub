import React, { useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            <div className='flex justify-end p-4 bg-gray-800 gap-5'>
                <select
                    className={`rounded-xl p-2 ${isOpen == true ? `show` : `hidden`}`}
                    onChange={e => console.log(e.target.value)}>
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
                    onClick={()=>navigate('/all-projects')}
                />

            </div>
        </>
    )
}

export default Navbar