import React, { createContext, useEffect, useState } from 'react'
export const authContext = createContext()
const Auth = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState('')
    const [postLikes, setPostLikes] = useState(0)
    const [commentLikes, setCommentLikes] = useState(0)
    const [comments, setComments] = useState([])
    const [project, setProject] = useState(null)
    const [commentContent, setCommentContent] = useState('')
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
        <authContext.Provider value={{ loggedInUser, setLoggedInUser, postLikes, setPostLikes, commentLikes, setCommentLikes, comments, setComments, project, setProject, commentContent, setCommentContent }}>
            {children}
        </authContext.Provider>
    )
}

export default Auth