import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import CommentAndReplies from "./CommentAndReplies.jsx"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from './Loader.jsx'
import ProfileIcon from './ProfileIcon.jsx'
import CommentIcon from './CommentIcon.jsx'
import Views from './Views.jsx'
import { authContext } from './Auth.jsx'
import { MdDeleteOutline } from "react-icons/md";


const ViewProject = () => {
  // const [project, setProject] = useState(null)
  const { loggedInUser, postLikes, setPostLikes, comments, setComments, project, setProject, commentContent, setCommentContent, userLikedPost, setUserLikedPost, commentLikes } = useContext(authContext)

  const [replyBox, setReplyBox] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const navigate = useNavigate()

  const { projectId } = useParams()
  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/project/${projectId}`, { withCredentials: true })
      console.log("fetched project\n", response.data?.project)
      setProject(response?.data?.project)
      setComments(response.data?.project?.comments)
      setPostLikes(response.data?.project?.likes)
    } catch (error) {
      console.log(error.response.data?.msg)
      toast.error(error.response.data?.msg)
    }
  }
  const likeProject = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/${projectId}/like`, {}, { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
      if (response?.data?.msg === "Liked") setPostLikes(prev => prev + 1)
      else setPostLikes(prev => prev - 1)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }
  const likeComment = async (commentId) => {
    try {
      console.log(commentId)
      const response = await axios.post(`http://localhost:5000/api/v1/comment/u/like`, {
        commentId,
      }, { withCredentials: true })
      toast.success(response.data?.msg)
      console.log(response.data)
      setComments(prevComments =>
        prevComments.map(comment => {
          if (comment?._id === commentId) {
            return {
              ...comment,
              likes: response.data?.msg === "comment liked" ? comment.likes + 1 : comment.likes - 1
            };
          }
          return comment;
        })
      );
    } catch (error) {
      console.log(error)
      if ((error?.response?.data?.msg).includes('unauthorized')) navigate('/login')
      toast.error(error?.response?.data?.msg)
    }
  }
  const likeReply = async (replyId, projectId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/reply/u/like", {
        replyId,
        projectId
      }, { withCredentials: true })
      setComments(prevComments =>
        prevComments.map(comment => ({
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply._id === replyId) {
              return {
                ...reply,
                likes: response.data?.msg === "Liked Reply" ? reply.likes + 1 : reply.likes - 1
              };
            }
            return reply;
          })
        }))
      );


      toast.success(response.data?.msg)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg)
    }
  }
  const addComment = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`http://localhost:5000/api/v1/${projectId}/comment`, {
        comment: commentContent
      }, { withCredentials: true })
      console.log(response.data)
      setComments(response?.data?.postComments?.comments)
      setCommentContent('')
      toast.success(response?.data?.msg)
    } catch (error) {
      console.log(error.response?.data?.msg)
      toast.error(error.response?.data?.msg)
    }
  }
  const addReply = async (commentId, projectId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/${commentId}/reply`,
        {
          replyContent,
          projectId
        },
        { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
      setComments(response.data?.commentAndreplies?.comments)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }
  const deleteComment = async (commentId, projectId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1//${projectId}/${commentId}/delete-comment`, { withCredentials: true })
      console.log(response?.data?.msg)
      toast.success(response?.data?.msg)
      setComments(response?.data?.restComments?.comments)
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
  }
  const deleteProject = async (projectId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/${projectId}/delete`, { withCredentials: true })
      console.log(response.data)
      if (response?.data?.msg === "Project Deleted") {
        toast.success(response?.data?.msg)
        navigate('/all-projects')
      }
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <>
      <Navbar />
      <div>
        {(project && project?._id === projectId) ?
          <>
            <div className='flex flex-col items-center'>
              <div key={project?._id} className='bg-gray-100 shadow-2xl text-black w-[60vw] rounded-xl flex justify-between flex-col p-5 mt-10 hover:cursor-pointer'>
                <div className='flex w-full flex-wrap'>
                  <h1 className='text-xl font-bold hover:underline w-full'>{project?.title}</h1>
                  <div className='flex w-full justify-between'>
                    <div className='flex items-center justify-center'>
                      <div className=''>
                        <div className='flex gap-1'>
                          <span className='flex items-center justify-center'>
                            <ProfileIcon />
                            <p className='hover:underline hover:text-green-700'>{project?.owner?.username}</p>
                          </span>
                          <span className='flex gap-1 items-center'>
                            |
                            <CommentIcon />
                            <span>{project?.comments?.length}</span>
                            <span>Comments</span>
                          </span>
                        </div>
                        <div className='flex gap-1 items-center'>
                          <p className=''>{Date(project?.createAt)?.split(' ')[1] + "/" + Date(project?.createAt)?.split(' ')[2] + "/" + Date(project?.createAt)?.split(' ')[3]}</p>
                          <span className='flex gap-1 items-center'>
                            |
                            <Views />
                            <p>{project?.views}</p>
                          </span>
                        </div>
                        <div>
                          {project?.TechStack?.map(x => (
                            <button key={x} className='bg-gray-200 p-1 mr-4'>{x}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-center'>
                      <p className='mb-2'>{project?.level}</p>
                      <button className='text-3xl' onClick={likeProject}>👍</button>
                      <span className='text-2xl mx-3 font-extrabold'>{postLikes}</span>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h1 className='font-bold mt-5'>Detail :</h1>
                  <h2>{project?.content}</h2>
                </div>
              </div>
              {/* if logged in user is owner . so show delete button and update button*/}
              {(project?.owner?.username === loggedInUser) ?
                <div className=''>
                  <button className='bg-red-600 p-3 rounded-xl text-white mt-5 hover:bg-red-700 mx-2' onClick={() => deleteProject(project?._id)}>Delete Project</button>
                  <button className='bg-green-600 p-3 rounded-xl text-white mt-5 hover:bg-green-700 mx-2' onClick={() => navigate(`/project/${project?._id}/edit`, {
                    state: {
                      title: project?.title,
                      TechStack: project?.TechStack,
                      content: project?.content
                    }
                  })}>Edit Project</button>
                </div>
                : <></>
              }

              <form className='mt-10 flex flex-col items-end'>
                <textarea type='text' placeholder='add a comment' className='p-3 rounded-xl w-[60vw] outline-none bg-gray-200 text-black h-[120px]' value={commentContent} onChange={e => setCommentContent(e.target.value)} required></textarea>
                <button type="submit" className="bg-green-600 text-white p-3 rounded-xl w-1/6 hover:bg-green-700" onClick={addComment} >Comment</button>
              </form>
            </div>
            <CommentAndReplies />
            {/* </> : <Loader /> */}
          </> :
          <div className="flex w-52 flex-col gap-4 items-center justify-center">
            <div className="skeleton bg-gray-300 h-32 w-full"></div>
            <div className="skeleton bg-gray-300 h-4 w-28"></div>
            <div className="skeleton bg-gray-300 h-4 w-full"></div>
            <div className="skeleton bg-gray-300 h-4 w-full"></div>
          </div>
        }
      </div >
    </>
  )
}

export default ViewProject
