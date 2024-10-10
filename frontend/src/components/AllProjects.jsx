import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Loader from './Loader'
import ProfileIcon from './ProfileIcon'
import CommentIcon from './CommentIcon'
import toast from 'react-hot-toast'
import { authContext } from './Auth'

const AllProjects = () => {
    const {allProjects , setAllProjects} = useContext(authContext)
    const navigate = useNavigate()
    const fetchAllPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/all-projects`, { withCredentials: true })
            console.log(response?.data?.allProjects)
            setAllProjects(response?.data?.allProjects)
        } catch (error) {
            if ((error?.response?.data?.msg).includes('unauthorized')) {
                toast.error(error?.response?.data?.msg)
                navigate('/login')
            }
            console.log(error?.response?.data?.msg)
        }
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

    return (
        <>
            <div>
                <Navbar />
                {
                    allProjects?.length > 0 ?
                        <div className='h-screen bg-gray-900 flex flex-col items-center'>
                            {allProjects?.map(each => (
                                <div key={each._id} className='bg-gray-100 text-black w-[60vw] rounded-xl flex justify-between p-5 mt-10 hover:cursor-pointer'
                                    onClick={() => navigate(`/project/${each._id}`)} >
                                    <div className='w-1/2'>
                                        <Link className='text-xl font-bold hover:underline'>{each.title}</Link>
                                        <div className=''>
                                            <div className='flex gap-1'>
                                                <span className='flex items-center justify-center'>
                                                    <ProfileIcon />
                                                </span>
                                                <p className='hover:underline hover:text-green-700'>{each?.owner?.username}</p>
                                                <p className=''></p>
                                                <span className='flex gap-1 items-center'>
                                                    |
                                                    <CommentIcon />
                                                    <span>{each?.comments?.length}</span>
                                                    <span>Comments</span>
                                                </span>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <p className=''>{Date(each?.createAt)?.split(' ')[1] + "/" + Date(each?.createAt)?.split(' ')[2] + "/" + Date(each?.createAt)?.split(' ')[3]}</p>
                                                <span className='flex gap-1 items-center'>
                                                    |
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2zm16.001 14H5V5h14l.001 14z"></path><path d="M11 7h2v10h-2zm4 3h2v7h-2zm-8 2h2v5H7z"></path></svg>
                                                    <p>{each?.views}</p>
                                                </span>
                                            </div>
                                            <div>
                                                {each?.TechStack?.map(x => (
                                                    <button key={x} className='bg-gray-200 p-1 mr-4'>{x}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end justify-end w-1/2 '>
                                        <p className='mb-2'>{each?.level}</p>
                                        <button className='text-3xl'>👍</button>
                                        <span className='text-2xl mx-3 font-extrabold'>{each?.likes}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <Loader />
                }

            </div>
        </>
    )
}

export default AllProjects