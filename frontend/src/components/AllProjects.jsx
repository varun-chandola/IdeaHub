import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const AllProjects = () => {
    const [allProjects, setAllProjects] = useState([])
    const fetchAllPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/all-projects`, { withCredentials: true })
            console.log(response?.data?.allProjects)
            setAllProjects(response?.data?.allProjects)
        } catch (error) {
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
                <div className='h-screen bg-gray-900 flex flex-col items-center'>
                    {allProjects?.map(each => (
                        <div key={each._id} className='bg-gray-100 text-black w-[60vw] rounded-xl flex justify-between p-5 mt-10'>
                            <div>
                                <p className='text-xl font-bold'>{each.title}</p>
                                <div className=''>
                                    <div className='flex gap-1'>
                                        <span className='flex items-center justify-center'>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </span>
                                        <Link className=''>{each?.owner?.username}</Link>
                                        <p className=''></p>
                                        <span className='flex gap-1 items-center'>
                                            |
                                            <svg width="1em" height="1em" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g id="" stroke="currentColor" strokeWidth="0" fill="currentColor">
                                                    <g id="Icon-Set" sketch:type="MSLayerGroup" transform="" fill="#000000">
                                                        <path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z" id="comment-3" sketch:type="MSShapeGroup">
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
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
                            <div className='flex flex-col items-center justify-center'>
                                <p className='mb-2'>{each?.level}</p>
                                <button className='text-3xl'>👍</button>
                                <span className='text-2xl font-extrabold'>{each?.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllProjects