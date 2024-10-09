import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">ProjectIdeas</div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-400">Sign Up</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Turn Ideas into Reality</h1>
          <p className="text-xl text-gray-300 mb-8">Submit and discover project ideas with potential for SaaS, startups, or developer growth</p>
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="💡"
            title="Submit Ideas"
            description="Share your innovative project concepts with a community of developers and entrepreneurs."
          />
          <FeatureCard
            icon="🚀"
            title="Discover Opportunities"
            description="Explore a wide range of project ideas with potential for SaaS or startup ventures."
          />
          <FeatureCard
            icon="🌱"
            title="Grow as a Developer"
            description="Find projects that challenge you and help expand your skills and portfolio."
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-6">Connect with like-minded individuals, collaborate on projects, and turn ideas into reality.</p>
          <Link to="/all-projects" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Explore Projects
          </Link>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; 2023 ProjectIdeas. All rights reserved.</p>
        <div className='flex justify-center items-center m-auto gap-5'>
          <Link to='https://x.com/VarunChandola7' target='_blank'>Twitter</Link>
          <Link to='https://www.linkedin.com/in/varun-chandola' target='_blank'>LinkedIn</Link>
          <Link to='https://www.instagram.com/varunchandola/' target='_blank'>Instagram</Link>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}