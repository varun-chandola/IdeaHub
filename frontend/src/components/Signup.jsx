import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/signup`, {
        username,
        password
      }, {
        withCredentials: true
      })
      console.log(response.data)
      if (response?.data?.msg == "Signup Successfull")
        navigate('/all-projects')
    } catch (error) {
      setError(error?.response?.data?.msg)
    }
  }

  return (
    <>
      <div className='flex h-screen flex-col items-center justify-center bg-gray-900'>
        <div className='bg-white rounded-2xl p-10 flex justify-center items-center flex-col'>
          <h1 className='text-black text-xl font-bold mb-10'>Create Account</h1>
          <form onSubmit={handleSignup} className='w-full'>
            <input type='text'
              required
              className='border-none text-black text-bold w-full p-3  bg-gray-200 focus:outline-blue-400 focus:bg-white mb-5 rounded-xl'
              placeholder='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            /><br />
            <input
              type='password'
              required
              className='border-none text-black text-bold bg-gray-200 w-full p-3 focus:outline-blue-400 focus:bg-white mb-5 rounded-xl'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            /><br />
            <p className='text-l text-red-600 mx-1'>{error}</p>
            <button type='submit' className='bg-blue-500 rounded-xl p-3 w-full hover:bg-blue-700' >Signup</button>
          </form>
          <p className='text-black mt-10 mx-2'>Already have an account?<Link to='/login' className='mx-2 text-blue-700 font-bold'>Sign In</Link></p>
        </div>
      </div>
    </>
  )
}

export default Signup