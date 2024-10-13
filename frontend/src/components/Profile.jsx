import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import { authContext } from './Auth'
import YourProjects from "./YourProjects.jsx"
import YourLikedProjects from './YourLikedProjects.jsx'

const Profile = () => {
  const { loggedInUser } = useContext(authContext)
  const [postOrLikes, setPostOrlikes] = useState('Your Posts')
  return (
    <>
      <Navbar />
      <div className='h-100vh min-h-screen'>
        <span className='flex items-center justify-center mt-10'>
          <h1 className='text-2xl'>Hey @{loggedInUser}</h1>
        </span>
        <div role="tablist" className="tabs tabs-lifted max-w-[80vw] m-auto mt-10">
          <a role="tab" onClick={() => setPostOrlikes("Your Posts")} className={`tab ${postOrLikes === "Your Posts" ? `tab-active` : <></>}`}>Your Posts</a>
          <a role="tab" onClick={() => setPostOrlikes("Your Liked Posts")} className={`tab ${postOrLikes === "Your Liked Posts" ? `tab-active` : <></>}`}>Your Liked Posts</a>
        </div>
        <div>
          {
            postOrLikes === "Your Posts" ? <YourProjects /> : <YourLikedProjects />
          }
        </div>
      </div>
    </>
  )
}

export default Profile