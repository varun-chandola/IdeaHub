import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
export const authContext = createContext()
const Auth = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState('')
    const [postLikes, setPostLikes] = useState(0)
    const [comments, setComments] = useState([])
    const [project, setProject] = useState(null)
    const [userLikedPost, setUserLikedPost] = useState(false)
    const [allProjects, setAllProjects] = useState([])
    const [commentLikes, setCommentLikes] = useState(0)



    const yourProjects = async () => {
        try {
            const response = await axios.get(`https://ideahub-backend.onrender.com/api/v1/your-projects`, { withCredentials: true })
            console.log('Your Projects\n', response)
            setAllProjects(response.data?.yourProjects)
        } catch (error) {
            console.log(error.response?.data?.msg)
            toast.error(error.response?.data?.msg)
        }
    }
    const YourLikedProjects = async () => {
        try {
            const response = await axios.get(`https://ideahub-backend.onrender.com/api/v1/your-liked-projects`, { withCredentials: true })
            console.log(response?.data)
            setAllProjects(response.data?.yourLikedProjects)
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    }


    const token = document?.cookie?.split("=")[1];

    useEffect(() => {
        if (token && token.split('.').length === 3) {
            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                setLoggedInUser(decodedToken?.username);
            } catch (e) {
                console.error("Token decoding error:", e);
            }
        }
    }, [token]);

    return (
        <authContext.Provider value={{ loggedInUser, setLoggedInUser, postLikes, setPostLikes, comments, setComments, project, setProject, userLikedPost, setUserLikedPost, allProjects, setAllProjects, commentLikes, setCommentLikes, yourProjects, YourLikedProjects }}>
            {children}
        </authContext.Provider>
    );
};

export default Auth;
