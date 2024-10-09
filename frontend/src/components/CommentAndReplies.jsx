import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import ProfileIcon from './ProfileIcon'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { authContext } from './Auth'
import { MdDeleteOutline } from "react-icons/md";

const CommentAndReplies = (props) => {
  const { loggedInUser } = useContext(authContext)
  const [replyBox, setReplyBox] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const navigate = useNavigate()


  const likeComment = async (commentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/comment/u/like`, {
        commentId,
      }, { withCredentials: true })
      toast.success(response.data?.msg)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      if ((error?.response?.data?.msg).includes('unauthorized')) navigate('/login')
      toast.error(error?.response?.data?.msg)
    }
  }

  const addReply = async (commentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/comment/u/reply`,
        {
          commentId,
          replyContent,
        },
        { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/${commentId}/delete-comment`, { withCredentials: true })
      console.log(response?.data?.msg)
      toast.success(response?.data?.msg)
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
  }

  return (
    <div className='text-white w-[60vw] flex-wrap h-screen'>
      {props ?
        <>
          {props?.projectComment?.map(each => (
            <div key={each?._id} className='mt-5 p-2'>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <span className='flex items-center justify-center'>
                    <ProfileIcon />
                  </span>
                  <h1 className='rounded-xl p-1'>{each?.owner?.username}</h1>
                  {(loggedInUser === (each?.owner?.username)) ? <MdDeleteOutline className='text-2xl mx-3 hover:cursor-pointer' onClick={() => deleteComment(each?._id)} /> : <></>}
                </div>
              </div>
              <div className='mx-6 flex gap-4'>
                <div className='flex flex-wrap'>
                  <p>{each?.comment}</p>
                </div>
                <div className='flex gap-2 items-start flex-wrap max-w-[30vw]'>
                  <div className='flex gap-2 w-[40vw]'>
                    <button onClick={() => likeComment(each?._id)}>👍</button>
                    <p>{each?.likes}</p>|
                    <p className="hover:underline hover:cursor-pointer" onClick={() => setReplyBox(each?._id)}>Reply</p>
                  </div>
                  <div className={(replyBox === each?._id) ? `show` : `hidden`}>
                    <form className='flex flex-col'
                      onSubmit={e => e.preventDefault()}>
                      <textarea
                        type='text'
                        placeholder='add a reply'
                        className='p-2 rounded-xl w-[300px] outline-none bg-gray-700 text-white'
                        onChange={(e) => setReplyContent(e.target.value)}
                      ></textarea>
                      <div className='flex justify-end'>
                        <button type="submit" className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700" onClick={() => addReply(each?._id)}>Add Reply</button>
                        <button className="mx-4 bg-red-600 text-white p-3 rounded-xl hover:bg-red-700" onClick={() => setReplyBox('hidden')}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className='gap-5'>
                {each?.replies?.map(x =>
                (
                  <div key={x?._id} className='mx-10 mt-5'>
                    <div className='flex flex-col'>
                      <div className='flex'>
                        <span className='flex items-center justify-center'>
                          <ProfileIcon />
                        </span>
                        <h1 className='rounded-xl p-1'>{x?.owner?.username}</h1>
                      </div>
                    </div>
                    <div className='mx-4 flex gap-4'>
                      <div className='flex'>
                        <span className='flex gap-3'>
                          <p className='text-blue-300'>@{each?.owner?.username}</p>{x?.comment}
                        </span>
                      </div>
                      <div className='flex gap-2 items-start'>
                        <button onClick={() => likeComment(x?._id)}>👍</button>
                        <p>{x?.likes}</p>
                      </div>
                    </div>
                  </div>))}
              </div>
            </div>
          ))}
        </> : <Loader />
      }
    </div >
  )
}

export default CommentAndReplies