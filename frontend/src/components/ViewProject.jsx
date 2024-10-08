import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import CommentAndReplies from "./CommentAndReplies.jsx"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from './Loader.jsx'
import ProfileIcon from './ProfileIcon.jsx'
import CommentIcon from './CommentIcon.jsx'
import Views from './Views.jsx'

const ViewProject = () => {
  const [project, setProject] = useState(null)
  const [comment, setComment] = useState('')
  const { projectId } = useParams()

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/project/${projectId}`, { withCredentials: true })
      console.log(response.data)
      setProject(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [project?.likes, project?.comments])

  const addComment = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`http://localhost:5000/api/v1/${projectId}/comment`, {
        comment
      }, { withCredentials: true })
      console.log(response.data)
      toast.success(response?.data?.msg)
    } catch (error) {
      console.log(error.response?.data?.msg)
      toast.error(error.response?.data?.msg)
    }
  }

  const likeProject = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/${projectId}/like`, {}, { withCredentials: true })
      console.log(response?.data)
      toast.success(response?.data?.msg)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      toast.error(error?.response?.data?.msg)
    }
  }


  return (
    <>
      <Navbar />
      <div>
        {project ?
          <>
            <div className='flex flex-col items-center'>
              <div key={project?.project?._id} className='bg-gray-100 text-black w-[60vw] rounded-xl flex justify-between flex-col p-5 mt-10 hover:cursor-pointer'>
                <div className='flex w-full flex-wrap'>
                  <h1 className='text-xl font-bold hover:underline w-full'>{project?.project?.title}</h1>
                  <div className='flex w-full justify-between'>
                    <div className='flex items-center justify-center'>
                      <div className=''>
                        <div className='flex gap-1'>
                          <span className='flex items-center justify-center'>
                            <ProfileIcon />
                            <p className='hover:underline hover:text-green-700'>{project?.project?.owner?.username}</p>
                          </span>
                          <span className='flex gap-1 items-center'>
                            |
                            <CommentIcon />
                            <span>{project?.project?.comments?.length}</span>
                            <span>Comments</span>
                          </span>
                        </div>
                        <div className='flex gap-1 items-center'>
                          <p className=''>{Date(project?.project?.createAt)?.split(' ')[1] + "/" + Date(project?.project?.createAt)?.split(' ')[2] + "/" + Date(project?.project?.createAt)?.split(' ')[3]}</p>
                          <span className='flex gap-1 items-center'>
                            |
                            <Views />
                            <p>{project?.project?.views}</p>
                          </span>
                        </div>
                        <div>
                          {project?.project?.TechStack?.map(x => (
                            <button key={x} className='bg-gray-200 p-1 mr-4'>{x}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-center'>
                      <p className='mb-2'>{project?.project?.level}</p>
                      <button className='text-3xl' onClick={likeProject}>👍</button>
                      <span className='text-2xl mx-3 font-extrabold'>{project?.project?.likes}</span>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h1 className='font-bold mt-5'>Detail :</h1>
                  <h2>{project?.project?.content}</h2>
                </div>
              </div>
              <form className='mt-10 flex flex-col items-end'>
                <textarea type='text' placeholder='add a comment' className='p-3 rounded-xl w-[60vw] outline-none bg-gray-700 text-white h-[120px]' value={comment} onChange={e => setComment(e.target.value)} required></textarea>
                <button type="submit" className="bg-green-600 text-white p-3 rounded-xl w-1/6 hover:bg-green-700" onClick={addComment} >Comment</button>
              </form>
            </div>
            <div className='flex flex-col items-center m-auto'>
              <CommentAndReplies projectComment={project?.project?.comments} />
            </div>
          </> : <Loader />
        }
      </div >
    </>
  )
}

export default ViewProject