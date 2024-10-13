import React, { useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditProject = () => {
    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedLevel, setUpdatedLevel] = useState("")
    const [updatedTechStack, setUpdatedTechStack] = useState("")
    const [updatedContent, setUpdatedContent] = useState("")
    const location = useLocation()
    const { projectId } = useParams()
    const navigate = useNavigate()

    const editProject = async (e) => {
        const updatedData = {
            title: updatedTitle,
            level: updatedLevel,
            content: updatedContent,
            TechStack: updatedTechStack,
        }
        console.log(updatedData)
        try {
            e.preventDefault()
            const response = await axios.patch(`http://localhost:5000/api/v1/${projectId}/edit`, updatedData, { withCredentials: true })
            console.log(response?.data)
            if (response?.data?.msg === "updated") {
                toast.success(response?.data?.msg)
                navigate(`/project/${projectId}`)
            }
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    }
    return (
        <>
            <Navbar />
            <div className="min-h-screen text-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl text-black font-bold mb-8 text-center">Edit Project</h1>
                    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <form className="p-6 space-y-6" onSubmit={editProject}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder={`${location?.state?.title}`}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={updatedTitle}
                                    onChange={e => setUpdatedTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="level" className="block text-sm font-medium text-gray-400 mb-1">Level</label>
                                <select
                                    id="level"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={updatedLevel}
                                    onChange={e => setUpdatedLevel(e.target.value)}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="techStack" className="block text-sm font-medium text-gray-400 mb-1">Tech Stack</label>
                                <input
                                    id="techStack"
                                    type="text"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`${location?.state?.TechStack}`}
                                    value={updatedTechStack}
                                    onChange={e => setUpdatedTechStack(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">Project Description</label>
                                <textarea
                                    id="content"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                                    placeholder={`${location?.state?.content}`}
                                    value={updatedContent}
                                    onChange={e => setUpdatedContent(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Create Project Idea
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProject