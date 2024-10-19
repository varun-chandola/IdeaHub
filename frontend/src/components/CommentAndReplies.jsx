import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import ProfileIcon from './ProfileIcon'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { authContext } from './Auth'
import { MdDeleteOutline } from "react-icons/md";

const CommentAndReplies = () => {
  const { loggedInUser, project, comments, setComments } = useContext(authContext)
  const [deleteLoader, setDeleteLoader] = useState(false)
  
  const [replyBox, setReplyBox] = useState()
  const [replyContent, setReplyContent] = useState('')
  const navigate = useNavigate()

  const addReply = async (commentId, projectId) => {
    try {
      const response = await axios.post(`https://ideahub-backend.onrender.com/api/v1/${commentId}/reply`,
        {
          replyContent,
          projectId
        },
        { withCredentials: true })
      toast.success(response?.data?.msg)
      setComments(prevComments =>
        prevComments?.map(comment =>
          comment?._id === commentId ? {
            ...comment,
            replies: response.data.commentAndreplies.comments.find(c => c._id === commentId)?.replies || comment.replies
          } : comment
        )
      );
      setReplyContent('')
      setReplyBox(null)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }
  const deleteComment = async (commentId, projectId) => {
    try {
      setDeleteLoader(true)
      const response = await axios.delete(`https://ideahub-backend.onrender.com/api/v1//${projectId}/${commentId}/delete-comment`, { withCredentials: true })
      console.log(response?.data?.msg)
      if (response && response?.data.msg) {
        setDeleteLoader(false)
        toast.success(response?.data?.msg)
        setComments(response?.data?.restComments?.comments)
      }
    } catch (error) {
      console.log(error?.response?.data?.msg)
      setDeleteLoader(false)
    } finally {
      setDeleteLoader(false)
    }
  }
  const likeComment = async (commentId) => {
    try {
      console.log(commentId)
      const response = await axios.post(`https://ideahub-backend.onrender.com/api/v1/comment/u/like`, {
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
      const response = await axios.post("https://ideahub-backend.onrender.com/api/v1/reply/u/like", {
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
  return (
    <div className='flex flex-col items-center m-auto'>
      <div className='text-black w-[60vw] flex-wrap h-screen text-l'>
        {(project && comments) ?
          <>
            {comments?.slice()?.reverse().map(comment => (
              <div key={comment?._id} className='mt-5 p-2'>
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <span className='flex items-center justify-center'>
                      <ProfileIcon />
                    </span>
                    <h1 className='rounded-xl p-1'>{comment?.owner?.username}</h1>
                    {(loggedInUser === comment?.owner?.username) ? (
                      deleteLoader ? (
                        <button className=''>
                          <span className="loading loading-spinner loading-xl text-black"></span>
                        </button>
                      ) : (
                        <MdDeleteOutline
                          className='text-2xl mx-3 hover:cursor-pointer'
                          onClick={() => deleteComment(comment?._id, project?._id)}
                        />
                      )
                    ) : null}

                  </div>
                </div>
                <div className='mx-6 flex gap-4'>
                  <div className='flex flex-wrap'>
                    <p>{comment?.comment}</p>
                  </div>
                  <div className='flex gap-2 items-start flex-wrap max-w-[30vw]'>
                    <div className='flex gap-2 w-[40vw]'>
                      <button onClick={() => likeComment(comment?._id)}>👍</button>
                      <p>{comment?.likes}</p>|
                      <p className="hover:underline hover:cursor-pointer" onClick={() => setReplyBox(comment?._id)}>Reply</p>
                    </div>
                    <div className={(replyBox === comment?._id) ? `show` : `hidden`}>
                      <form className='flex flex-col'
                        onSubmit={e => e.preventDefault()}>
                        <textarea
                          type='text'
                          value={replyContent}
                          placeholder='add a reply'
                          className='p-2 rounded-xl w-[300px] outline-none text-gray-900'
                          onChange={e => setReplyContent(e.target.value)}
                        ></textarea>
                        <div className='flex justify-end'>
                          <button type="submit" className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700" onClick={() => addReply(comment?._id, project?._id)}>Add Reply</button>
                          <button className="mx-4 bg-red-600 text-white p-3 rounded-xl hover:bg-red-700" onClick={() => { setReplyContent(""); setReplyBox() }}>Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='gap-5' key={comment?._id}>
                  {comment?.replies?.slice()?.reverse().map(reply => (
                    <div key={reply?._id}>
                      <div key={reply?._id} className='mx-10 mt-5'>
                        <div className='flex flex-col'>
                          <div className='flex'>
                            <span className='flex items-center justify-center'>
                              <ProfileIcon />
                            </span>
                            <h1 className='rounded-xl p-1'>{reply?.owner?.username}</h1>
                          </div>
                        </div>
                        <div className='mx-4 flex gap-4'>
                          <div className='flex'>
                            <span className='flex gap-3'>
                              <p className='text-blue-700 font-bold'>@{comment?.owner?.username}</p>{reply?.comment}
                            </span>
                          </div>
                          <div className='flex gap-2 items-start'>
                            <button onClick={() => likeReply(reply?._id, project?._id)}>👍</button>
                            <p>{reply?.likes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                  )}
                </div>
              </div>
            ))}
          </> : <Loader />
        }
      </div >
    </div>
  )
}

export default CommentAndReplies