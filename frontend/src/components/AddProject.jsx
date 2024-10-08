import React, { useState, useCallback } from 'react';
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
            if(response.data?.msg){
                toast.success(response.data?.msg)
                navigate('/all-projects')
            }
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    };

    return (
        <>
            <Navbar />
            <div className='bg-gray-600 text-black w-1/2 h-full m-auto rounded-2xl mt-10'>
                <form className='flex flex-col p-5' onSubmit={addNewProject}>
                    <label className='mx-2 text-white text-xl'>Title</label>
                    <input type='text' className='focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-xl p-3 mb-5 text-2xl' required value={title} onChange={e => setTitle(e.target.value)} />
                    <label className='mx-2 text-white text-xl'>Level</label>
                    <select className='mb-5 focus:bg-gray-300 p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500' required value={level} onChange={e => setLevel(e.target.value)}>
                        <option>Select</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <label className='mx-2 text-white text-xl'>Tech Stack</label>
                    <input type='text' className='mb-5 rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-blue-500' placeholder='MongoDB , Express.js , React.js , Node.js' required value={TechStack} onChange={e => setTechStack(e.target.value)} />
                    <label className='mx-2 text-white text-xl'>Project</label>
                    <textarea placeholder='content(Max 500 characters)' className='focus:outline-none focus:ring-4 focus:ring-blue-500 rounded-xl p-5 mb-10' required
                        value={content}
                        onChange={e => setContent(e.target.value)}></textarea>
                    <button type='submit' className='bg-blue-800 rounded-xl hover:bg-blue-900 p-5 text-white text-xl font-bold'>Create Project Idea</button>
                </form>
            </div>
        </>
    );
};

export default AddProject;
