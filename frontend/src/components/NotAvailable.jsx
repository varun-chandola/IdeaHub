import React from 'react'

const NotFound = () => {
  const goHome = () => {
    window.location.href = '/'
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
        <p className="text-lg text-gray-500 mt-4 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <button
            onClick={goHome}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Go Home
          </button>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound