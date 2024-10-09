import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('');
    const [TechStack, setTechStack] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const addNewProject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/add-project`, {
                title,
                level,
                TechStack,
                content
            }, { withCredentials: true });
            if ((error?.response?.data?.msg).includes('unauthorized')) {
                navigate('/login')
                toast.error(error?.response?.data?.msg)
            }
            if (response.data?.msg) {
                toast.success(response.data?.msg)
                navigate('/all-projects')
            }
        } catch (error) {
            toast.error(error.response?.data?.msg);
            if ((error?.response?.data?.msg).includes('unauthorized')) {
                navigate('/login')
                toast.error(error?.response?.data?.msg)
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">Add New Project</h1>
                    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <form className="p-6 space-y-6" onSubmit={addNewProject}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="level" className="block text-sm font-medium text-gray-400 mb-1">Level</label>
                                <select
                                    id="level"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={level}
                                    onChange={e => setLevel(e.target.value)}
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
                                    placeholder="MongoDB, Express.js, React.js, Node.js"
                                    required
                                    value={TechStack}
                                    onChange={e => setTechStack(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">Project Description</label>
                                <textarea
                                    id="content"
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                                    placeholder="Describe your project (Max 500 characters)"
                                    required
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
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
    );
};

export default AddProject;