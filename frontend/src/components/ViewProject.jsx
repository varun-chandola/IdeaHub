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

const ViewProject = () => {
  const { loggedInUser, postLikes, setPostLikes, comments, setComments, project, setProject } = useContext(authContext)
  const [likeLoader, setLikeLoader] = useState(false)
  const [commentLoader, setCommentLoader] = useState(false)

  const [commentContent, setCommentContent] = useState('')
  const navigate = useNavigate()

  const { projectId } = useParams()
  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://ideahub-backend.onrender.com/api/v1/project/${projectId}`, { withCredentials: true })
      console.log("fetched project\n", response.data?.project)
      setProject(response?.data?.project)
      setComments(response.data?.project?.comments)
      setPostLikes(response.data?.project?.likes)
    } catch (error) {
      console.log(error.response.data?.msg)
      toast.error(error.response.data?.msg)
      navigate('/login')
    }
  }
  const likeProject = async () => {
    try {
      setLikeLoader(true)
      const response = await axios.post(`https://ideahub-backend.onrender.com/api/v1/${projectId}/like`, {}, { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
      if (response?.data?.msg === "Liked") {
        setLikeLoader(false)
        setPostLikes(prev => prev + 1)
      }
      else {
        setLikeLoader(false)
        setPostLikes(prev => prev - 1)
      }
    } catch (error) {
      console.log(error?.response?.data?.msg)
      setLikeLoader(false)
      toast.error(error?.response?.data?.msg)
    } finally {
      setLikeLoader(false)
    }
  }
  const addComment = async (e) => {
    try {
      setCommentLoader(true)
      e.preventDefault()
      const response = await axios.post(`https://ideahub-backend.onrender.com/api/v1/${projectId}/comment`, {
        comment: commentContent
      }, { withCredentials: true })
      console.log(response.data)
      if (response && response?.data?.postComments?.comments) {
        setComments(response?.data?.postComments?.comments)
        setCommentLoader(false)
        setCommentContent('')
        toast.success(response?.data?.msg)
      }
    } catch (error) {
      console.log(error.response?.data?.msg)
      setCommentLoader(false)
      toast.error(error.response?.data?.msg)
    } finally {
      setCommentLoader(false)
    }
  }
  const deleteProject = async (projectId) => {
    try {
      const response = await axios.delete(`https://ideahub-backend.onrender.com/api/v1/${projectId}/delete`, { withCredentials: true })
      console.log(response.data)
      if (response?.data?.msg === "Project Deleted") {
        toast.success(response?.data?.msg)
        navigate('/all-projects')
      }
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
  }
  const [replyBox, setReplyBox] = useState()
  const [replyContent, setReplyContent] = useState('')
  console.log("REPLY CONTENT:", replyContent)

  const addReply = async (commentId, projectId) => {
    try {
      const response = await axios.post(`https://ideahub-backend.onrender.com/api/v1/${commentId}/reply`,
        {
          replyContent,
          projectId
        },
        { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
      setComments(prevComments =>
        prevComments?.map(comment =>
          comment?._id === commentId ? {
            ...comment,
            replies: response.data.commentAndreplies.comments.find(c => c._id === commentId)?.replies || comment.replies
          } : comment
        )
      );
      setReplyBox(null)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }
  useEffect(() => {
    fetchPost()
  }, [comments?.length])

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
                          <p>{(String(new Date(`${project.createdAt}`)).split(" ")[0])}</p>
                          <p>{(String(new Date(`${project.createdAt}`)).split(" ")[1])}</p>
                          <p>{(String(new Date(`${project.createdAt}`)).split(" ")[2])}</p>
                          <p>{(String(new Date(`${project.createdAt}`)).split(" ")[3])}</p>
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
                      <span
                        className='text-2xl mx-3 font-extrabold'>
                        {likeLoader ?
                          <button className='w-full'><span className="loading loading-spinner loading-xl text-black"></span></button>
                          :
                          postLikes
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h1 className='font-bold mt-5'>Detail :</h1>
                  <h2>{project?.content}</h2>
                </div>
              </div>
              {(project?.owner?.username === loggedInUser) ?
                <div className=''>
                  <button className="btn bg-red-600 p-3 rounded-xl text-white mt-5 hover:bg-red-700 mx-2" onClick={() => document.getElementById('my_modal_1').showModal()}>Delete Project</button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Are You Sure ?</h3>
                      <p className="py-4">Press click Close button below to close</p>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn mx-5 rouned-xl bg-red-600 text-white hover:bg-red-700" onClick={() => deleteProject(project?._id)}> Yes</button>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button className='btn bg-green-600 p-3 rounded-xl text-white mt-5 hover:bg-green-700 mx-2' onClick={() => navigate(`/project/${project?._id}/edit`, {
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
                <button type="submit" className="btn bg-green-600 text-white p-3 rounded-xl w-1/6 hover:bg-green-700" onClick={addComment} >
                  {commentLoader ? <button className='w-full'><span className="loading loading-spinner loading-xl text-white font-extrabold"></span></button> : `Comment`}
                </button>
              </form>
            </div>
            {/* comments and replies */}
            <CommentAndReplies />

          </> :
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        }
      </div >
    </>
  )
}

export default ViewProject