import React from 'react';
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
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl font-bold text-center tracking-wider leading-tight">
              Get Great Ideas
            </h1>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-4xl font-light italic mt-3 tracking-wide">
              From other Tech Enthusiasts
            </p>
          </motion.p>
          <motion.p
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-center text-lg font-medium mt-2"
          >
            (Maybe find a <span className="text-blue-500 underline">SaaS</span> Idea)
          </motion.p>
          <div className="text-xl text-center mt-6">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="font-semibold tracking-wide leading-relaxed"
            >
              Found a product/project idea on{' '}
              <span className="text-orange-400">
                YCOMBINATOR.COM
              </span>
              ,{' '}
              <span className="text-orange-400">
                PRODUCTHUNT.COM
              </span>
              ,{' '}
              <span className="text-red-400">
                YOUTUBE.COM
              </span>
              ,{' '}
              <span className="">REDDIT.COM</span> ?
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              className="font-light mt-4 leading-snug"
            >
              Share about it and build in public on <span className="font-bold">X.com</span>.
            </motion.p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
