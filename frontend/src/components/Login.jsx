import React, { useContext, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from './Auth'
import toast from 'react-hot-toast'

export default function Login() {
  const { setLoggedInUser } = useContext(authContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/login`, {
        username,
        password
      }, {
        withCredentials: true
      })
      if (response?.data?.msg === "Login Successfull") {
        setLoggedInUser(username)
        toast.success(response?.data.msg)
        navigate('/all-projects')
      }
    } catch (error) {
      setError(error?.response?.data?.msg)
      console.log(error?.response?.data?.msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ProjectIdeas</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/login" className="text-blue-400 font-semibold">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-400">Sign Up</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="rounded-md bg-red-900 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-white">{error}</h3>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                New to ProjectIdeas?{' '}
                <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; 2023 ProjectIdeas. All rights reserved.</p>
      </footer>
    </div>
  )
}