import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
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
            const response = await axios.get(`http://localhost:5000/api/v1/your-projects`, { withCredentials: true })
            console.log('Your Projects\n', response)
            setAllProjects(response.data?.yourProjects)
        } catch (error) {
            console.log(error.response?.data?.msg)
            toast.error(error.response?.data?.msg)
        }
    }
    const YourLikedProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/your-liked-projects`, { withCredentials: true })
            console.log(response?.data)
            setAllProjects(response.data?.yourLikedProjects)
        } catch (error) {
            console.log(error?.response?.data?.msg)
            toast.error(error?.response?.data?.msg)
        }
    }


    const token = document?.cookie?.split("=")[1];
    useEffect(() => {
        console.log('logged in user : ', loggedInUser)
    }, [loggedInUser])

    useEffect(() => {

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setLoggedInUser(payload.username);
            } catch (e) {
                console.error("Invalid token:", e);
                // toast.error(e)
            }
        }
    }, [token])

    return (
        <authContext.Provider value={{ loggedInUser, setLoggedInUser, postLikes, setPostLikes, comments, setComments, project, setProject, userLikedPost, setUserLikedPost, allProjects, setAllProjects, commentLikes, setCommentLikes, yourProjects, YourLikedProjects }}>
            {children}
        </authContext.Provider>
    )
}

export default Auth