import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="flex justify-between items-center">
      <Link to='/signup' className="font-extrabold text-3xl">ideahub</Link>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="m-1 text-l font-medium cursor-pointer"
        >
          Post A New Idea
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li><a href="/signup" className=''>Sign up</a></li>
          <li><a href="/login" className=''>Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="mt-5">
      <div className='max-w-[60vw] m-auto'>
        <HomeNavbar />
      </div>
      <div className="flex flex-col">
        <div className="mt-[10vh] max-w-[80vw] mx-auto">
          <div className='max-w-[60vw]'>
            <h1 className='text-6xl font-extrabold'>Get great <span className='text-6xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent'>Project Ideas</span>🔥<br />from the Community of <br />Tech Enthusiasts</h1>
            <div className='flex gap-6 mt-5 items-center justify-center'>
              <Link to='/login' className="px-6 py-3 w-48 text-center bg-black text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300 w-[15vw]">Login</Link>
              <Link to='/signup' className="px-6 py-3 w-48 text-center bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-[15vw]">Sign Up</Link>
            </div>
            <div>
              <h1 className='mb-2 text-xl font-bold text-center mt-5 mb-3'>In Any Techstack</h1>
              <div className="flex justify-center items-center mb-4 overflow-x-auto relative z-20" ><div className="flex items-center space-x-2 mr-4"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-="round" strokeLinejoin="round" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-1"><path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path><path d="M15 12v-3"></path></svg></span><span className="text-sm font-semibold text-neutral-500 flex-shrink-0">Next.js</span></div><div className="flex items-center space-x-2 mr-4"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-1"><path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102"></path><path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102"></path><path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2"></path><path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2"></path><path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896"></path><path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897"></path><path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z"></path></svg></span><span className="text-sm font-semibold text-neutral-500 flex-shrink-0">React</span></div><div className="flex items-center space-x-2 mr-4"><span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-[0.5px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 9.51a4.22 4.22 0 0 1-1.91-1.34A5.77 5.77 0 0 0 12 6a4.72 4.72 0 0 0-5 4 3.23 3.23 0 0 1 3.5-1.49 4.32 4.32 0 0 1 1.91 1.35A5.77 5.77 0 0 0 17 12a4.72 4.72 0 0 0 5-4 3.2 3.2 0 0 1-3.5 1.51zm-13 4.98a4.22 4.22 0 0 1 1.91 1.34A5.77 5.77 0 0 0 12 18a4.72 4.72 0 0 0 5-4 3.23 3.23 0 0 1-3.5 1.49 4.32 4.32 0 0 1-1.91-1.35A5.8 5.8 0 0 0 7 12a4.72 4.72 0 0 0-5 4 3.2 3.2 0 0 1 3.5-1.51z"></path></svg></span><span className="text-sm font-semibold text-neutral-500 flex-shrink-0">TailwindCSS</span></div><div className="flex items-center space-x-2 mr-4"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-1"><path d="M12 12l-8 -8v16l16 -16v16l-4 -4"></path><path d="M20 12l-8 8l-4 -4"></path></svg></span><span className="text-sm font-semibold text-neutral-500 flex-shrink-0">Framer Motion</span></div></div>
            </div >
          </div>
        </div>
        <div className='w-[65vw] mx-auto h-1/2 bg-blue-400 p-16 rounded-3xl mt-4 flex shadow-2xl shadow-blue-900'>
          <img src={`https://res.cloudinary.com/da2fioulc/image/upload/v1738151222/kynidponb86zk7p0rirj.png`} className='rounded-3xl' />
        </div>
      </div>
    </div>
  );
};

export default Home;