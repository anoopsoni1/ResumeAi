import React from "react";
import {
  FiGlobe,
  FiZap,
  FiTarget,
} from "react-icons/fi";
import { FaFileMedical } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "./slice/user.slice";
import axios from "axios" ;
import { useSelector } from "react-redux";
import { NavLink , Link} from "react-router-dom";



function Topbar() {
   const user = useSelector((state) => state.user.userData);
   const dispatch = useDispatch() ;
   const navigate = useNavigate() ;


const handleLogout = async() => {
      try {
      await axios.post("https://shoesbackend-4.onrender.com/api/v1/user/logout", {}, { withCredentials: true })
          dispatch(clearUser())
          navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <header className="w-full  backdrop-blur-3xl bg-linear-to-br from-emerald-50 to-blue-50 sticky top-0 z-30">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4">
       
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600">
            <span className="text-lg font-semibold text-white"><FaFileMedical /></span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            RESUME AI
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
         
            <NavLink
            to="/"
              className={({isActive})=>(
              `  block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 `
              )
              }
            >
            Home
            </NavLink>
             <NavLink
             to="/dashboard"
              className={({isActive})=>(
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              )
              }
            >
           Dashboard
            </NavLink>
             <NavLink
             to="/price"
              className={({isActive})=>(
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              )
              }
            >
            Price
            </NavLink>
             <NavLink
             to="/about"
              className={({isActive})=>(
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              )
              }
            >
            About
            </NavLink>
        </nav>
        {
          user ?
           (<>
          <button className="px-2 py-2 bg-red-600 rounded-full hover:bg-red-700 transition text-center text-white"
            onClick={handleLogout}
          >Logout</button>
          </>) 
          
          : (<> <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-sm font-medium text-white p-2 px-2 rounded-full bg-indigo-600 md:inline-block shadow-md shadow-indigo-500/30 hover:bg-indigo-700">
            Sign In
          </Link>
          <Link to="/register"  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700">
            Get Started
          </Link>
        </div></>)
        }
       
      </div>
    </header>
  );
}

function StatCards() {
  return (
    <div className="mt-5 flex justify-evenly bg-linear-to-br from-emerald-50 to-blue-50 ">
      <div className="grid gap-4 ">
        <div
          className="rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-amber-600 w-[100vh]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiTarget size={20} />
              </div>
              <span className="text-xs font-medium">ATS Score</span>
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
            87%
          </div>
        </div>
        <div
          className="rounded-2xl p-4 shadow-sm border hover:border-amber-600 border-slate-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <AiOutlineFileText size={20} />
              </div>
              <span className="text-xs font-medium">Resume Status</span>
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
           Optimized
          </div>
        </div>
         <div
          className="rounded-2xl  p-4 shadow-sm border hover:border-amber-600 border-slate-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FiZap size={20} />
              </div>
              <span className="text-xs font-medium">Applications</span>
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-white">
         24
          </div>
        </div>
        </div>
      <div className=" grid gap-4 ">
          <div
            className="rounded-2xl  p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-600 transition w-[100vh]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
             <AiOutlineFileText size={24} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
             Upload New Resume
            </h3>

            <p className="mt-1 text-xs text-amber-600">Start fresh with a new resume upload.</p>

            <button className="mt-3 text-xs font-bold text-indigo-600 ">
              Get Started →
            </button>
          </div>
             <div
            className="rounded-2xl  p-5 shadow-sm border border-slate-100 hover:border-amber-600 hover:shadow-md transition"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <MdAutoAwesome size={24} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
           Optimize Resume
            </h3>

            <p className="mt-1 text-xs text-amber-600">Improve your ATS score and keywords.</p>

            <button className="mt-3 text-xs font-semibold text-indigo-600 ">
              Get Started →
            </button>
          </div>
             <div
            className="rounded-2xl p-5 shadow-sm border hover:border-amber-600 border-slate-100 hover:shadow-md transition"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
             <FiGlobe size={24} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
           Update Portfolio
            </h3>

            <p className="mt-1 text-xs text-amber-600">Customize your online presence.</p>

            <Link to="/upload" className="mt-3 text-xs font-semibold text-indigo-600 ">
              Get Started →
            </Link>
          </div>
      </div>
    </div>
  );
}


function Dashboard() {
   const user = useSelector((state) => state.user.userData);
  return (
    <>
     <Topbar />
                                
  {user ? (<>
   <div className="flex min-h-screen bg-linear-to-br from-emerald-50 to-blue-50">    
      <main className="flex-1">
        <div className="mx-auto  px-4 py-6">
          <div className="rounded-2xl p-6 shadow-sm border border-yellow-100">
            <h2 className="text-xl font-sharetech font-bold">
           <span className="text-amber-500">{user?.FirstName}{" "}{user?.LastName}</span> 
            </h2>
            <p className="mt-1 text-sm text-white font-rajdhani">
              Your resume is performing well. Here are your latest stats and
              quick actions.
            </p>
          </div>

          <StatCards />
       
        </div>
      </main>
      </div>
      </>) :(<>
      <div className=" bg-black text-center px-4 pt-20 pb-40">
        <div className="grid justify-center">
        <h1 className="text-4xl font-bold text-white mt-20">Welcome to ResumeAI Dashboard</h1>
        <p className="mt-4 text-lg text-white">Please log in to access your dashboard and manage your resumes.</p>
        <Link to="/login" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
          Go to Login
        </Link>                   
       </div>
        </div>
        
        </>)}
    
    <footer className="bg-black py-10 text-slate-300">
      <div className="mx-auto  px-4">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500">
                <span className="text-lg font-semibold text-white">AI</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                ResumeAI
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white">
              Transform your career with AI-assisted resume optimization and
              portfolio generation.
            </p>
            <div className="mt-4 flex gap-3 text-sm text-white">
              <span className="cursor-pointer hover:text-white">Twitter</span>
              <span className="cursor-pointer hover:text-white">LinkedIn</span>
              <span className="cursor-pointer hover:text-white">GitHub</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-white">
              <li>Features</li>
              <li>Pricing</li>
              <li>Templates</li>
              <li>Changelog</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-white">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-white">
              <li>Documentation</li>
              <li>Resume Tips</li>
              <li>ATS Guide</li>
              <li>API</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-white md:flex-row">
          <span>© 2025 ResumeAI. All rights reserved.</span>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Dashboard;
