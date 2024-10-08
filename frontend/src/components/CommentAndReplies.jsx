import axios from 'axios'
import React, { useState } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import ProfileIcon from './ProfileIcon'
import Loader from './Loader'

const CommentAndReplies = (props) => {
  const [replyBox, setReplyBox] = useState(null)
  const [replyContent, setReplyContent] = useState('')


  const likeComment = async (commentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/comment/u/like`, {
        commentId,
      }, { withCredentials: true })
      toast.success(response.data?.msg)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.msg)
    }
  }

  const addReply = async (commentId, replyOwner) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/comment/u/reply`,
        {
          commentId,
          replyContent,
          replyOwner
        },
        { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <div className='text-white w-[60vw] flex-wrap h-screen'>
      {props ?
        <>
          {props?.projectComment?.map(each => (
            <div key={each?._id} className='mt-5'>
              <div className='flex flex-col'>
                <div className='flex'>
                  <span className='flex items-center justify-center'>
                    <ProfileIcon />
                  </span>
                  <h1 className='rounded-xl p-1'>{each?.owner?.username}</h1>
                </div>
              </div>
              <div className='mx-6 flex gap-4'>
                <div className='max-w-[30vw] flex flex-wrap'>
                  <p>{each?.comment}</p>
                </div>
                <div className='flex gap-2 items-start'>
                  <button onClick={() => likeComment(each?._id)}>👍</button>
                  <p>{each?.likes}</p>|
                  <p className="hover:underline hover:cursor-pointer" onClick={() => setReplyBox(each?._id)}>Reply</p>
                  <div className={(replyBox === each?._id) ? `show` : `hidden`}>
                    <form className='mt-20 flex flex-col items-end'
                      onSubmit={e => e.preventDefault()}>
                      <textarea
                        type='text'
                        placeholder='add a reply'
                        className='p-3 rounded-xl mt-5 outline-none bg-gray-700 text-white'
                        onChange={(e) => setReplyContent(e.target.value)}
                      ></textarea>
                      <button type="submit" className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700" onClick={() => addReply(each?._id, each?.owner?.username)}>Reply</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className='gap-5'>
                {each?.replies?.map(x =>
                (
                  <div key={x?._id} className='mx-12 mt-5'>
                    <div className='flex flex-col'>
                      <div className='flex'>
                        <span className='flex items-center justify-center'>
                          <ProfileIcon />
                        </span>
                        <h1 className='rounded-xl p-1'>{x?.owner?.username}</h1>
                      </div>
                    </div>
                    <div className='mx-10 flex gap-4'>
                      <div className='max-w-[30vw] flex flex-wrap'>
                        <p>{x?.comment}</p>
                      </div>
                      <div className='flex gap-2 items-start'>
                        <button onClick={() => likeComment(x?._id)}>👍</button>
                        <p>{x?.likes}</p>|
                        <p className="hover:underline hover:cursor-pointer" onClick={() => setReplyBox(x?._id)}>Reply</p>
                        <div className={(replyBox === x?._id) ? `show` : `hidden`}>
                          <form className='mt-20 flex flex-col items-end'
                            onSubmit={e => e.preventDefault()}
                          >
                            <textarea
                              onChange={(e) => setReplyContent(e.target.value)}
                              type='text' placeholder='add a reply'
                              className='p-2 rounded-xl mt-5 outline-none bg-gray-700 text-white' required></textarea>
                            <button
                              onClick={() => addReply(x?._id, x?.owner?.username)}
                              type="submit" className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700">Reply</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                )
                }
              </div>
            </div>
          ))}
        </> : <Loader />
      }
    </div >
  )
}

export default CommentAndReplies