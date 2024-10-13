import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 text-gray-800">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            ProjectIdeas
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">Login</Link></li>
              <li><Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Ignite Your Next Big <span className="text-purple-600">Project</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, share, and collaborate on innovative ideas that shape the future of technology and business.
          </p>
          <Link to="/signup" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105">
            Get Started
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={
              <svg className="h-12 w-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Ideate"
            description="Brainstorm and refine your project concepts with our innovative community."
          />
          <FeatureCard
            icon={
              <svg className="h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Launch"
            description="Transform your ideas into reality with expert guidance and resources."
          />
          <FeatureCard
            icon={
              <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            title="Develop"
            description="Enhance your skills by working on cutting-edge projects and challenges."
          />
        </section>

        <section className="bg-white rounded-lg shadow-xl p-8 text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Explore Trending Projects</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ProjectCard title="AI-Powered Personal Assistant" category="Artificial Intelligence" />
            <ProjectCard title="Sustainable Energy Marketplace" category="Green Tech" />
            <ProjectCard title="Decentralized Social Network" category="Blockchain" />
          </div>
          <Link to="/all-projects" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Discover More Projects
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Thriving Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with innovators, entrepreneurs, and developers. Collaborate on projects that matter.
          </p>
          <div className="flex justify-center space-x-4">
            <StatCard number="10k+" label="Active Members" />
            <StatCard number="5k+" label="Project Ideas" />
            <StatCard number="500+" label="Successful Launches" />
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 text-center shadow-lg transition-transform hover:scale-105">
      <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ProjectCard({ title, category }) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 text-left transition-transform hover:scale-105">
      <div className="text-sm text-purple-600 font-semibold mb-2">{category}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <Link to="#" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
        Learn More
        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  )
}

function StatCard({ number, label }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="text-3xl font-bold text-purple-600 mb-1">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

function SocialLink({ href, icon }) {
  const iconPath = {
    twitter: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
    instagram: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A5 5 0 0122.5 11.5v11a5 5 0 01-5 5h-11a5 5 0 01-5-5v-11a5 5 0 015-5z"
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath[icon]} />
      </svg>
    </a>
  )
}