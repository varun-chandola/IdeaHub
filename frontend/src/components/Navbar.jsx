import React, { useContext } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authContext } from './Auth';

const Navbar = () => {
    const { loggedInUser, setAllProjects, allProjects } = useContext(authContext)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const response = await axios.post('https://ideahub-backend.onrender.com/api/v1/logout', {}, { withCredentials: true })
            if (response?.data?.msg == `Logout successful`) {
                console.log(response?.data?.msg)
                toast.success(response?.data?.msg)
                navigate('/')
            }
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a><IoMdAddCircleOutline className='text-3xl hover:cursor-pointer'
                            onClick={() => navigate('/add-project')}
                        /></a></li>
                        <li>
                            <a>Select</a>
                            <ul className="p-2">
                                <li><NavLink to='/profile'>Profile</NavLink></li>
                                <li><a onClick={() => logout()}>Logout</a></li>
                            </ul>
                        </li>
                        <li> <a>
                            <FaHome
                                className='text-3xl hover:cursor-pointer'
                                onClick={() => {
                                    setAllProjects(allProjects)
                                    navigate('/all-projects')
                                }}
                            />
                        </a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Ideas</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <IoMdArrowRoundBack className='text-3xl hover:cursor-pointer hover:text-blue-500' onClick={() => window.history.back()} />
                <ul className="menu menu-horizontal px-1">
                    <li><a>
                        <IoMdAddCircleOutline className='text-3xl hover:cursor-pointer'
                            onClick={() => navigate('/add-project')}
                        />
                    </a></li>
                    <li className='text-xl'>
                        <details>
                            <summary>@{loggedInUser}</summary>
                            <ul className="p-2 ">
                                <li><NavLink to='/profile'>Profile</NavLink></li>
                                <li><a onClick={() => logout()}>Logout</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <a>
                            <FaHome
                                className='text-3xl hover:cursor-pointer'
                                onClick={() => {
                                    setAllProjects(allProjects)
                                    navigate('/all-projects')
                                }}
                            />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="mx-10 p-2 rounded-xl font-bold btn" href='https://x.com/VarunChandola7' target='_blank'>Follow</a>
            </div>
        </div>
    )
}

export default Navbar