import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeNavbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="flex justify-between items-center">
      <h1 className="font-extrabold text-3xl">IdeaHUB</h1>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="m-1 text-xl font-medium cursor-pointer"
        >
          Post A New Idea
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li><a href="/signup" className='text-black'>Sign up</a></li>
          <li><a href="/login" className='text-black'>Login</a></li>
        </ul>
      </div>
      <button className="bg-white text-black text-xl font-bold p-3 rounded-xl hover:bg-gray-200" onClick={() => navigate(`/login`)}>
        Get Started
      </button>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="m-6">
      <div className="bg-black text-white rounded-[30px] p-6">
        <HomeNavbar />
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <motion.h1 animate={{ y: -10, dur: 2 }}>
            <h1 className="text-6xl font-extrabold text-center">
              Get Great Ideas <br />from Other Tech Enthusiasts.
            </h1>
          </motion.h1>
          <p className="text-center text-xl">(Maybe find a <span className='text-blue-500 underline decoration-wavy'>SaaS</span> Idea)</p>
          <div className="text-2xl text-center mt-4">
            <motion.p animate={{ y: -10, dur: 2 }}>
              Found a product/project idea on{' '}
              <span className='text-orange-400 underline decoration-wavy'>ycombinator.com</span>,{' '}
              <span className='text-orange-400 underline decoration-wavy'>producthunt.com</span>,{' '}
              <span className='text-red-400 underline decoration-wavy'>youtube.com</span>,{' '}
              <span className='underline decoration-wavy'>reddit.com</span>?
            </motion.p>
            <p>
              Share about it and build in public on <span className="font-extrabold">X.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
