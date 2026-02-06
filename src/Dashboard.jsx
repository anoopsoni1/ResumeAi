import React, { useState } from "react";
import {
  FiGlobe,
  FiZap,
  FiTarget,
} from "react-icons/fi";
import { FaFileMedical } from "react-icons/fa";
import { MdAutoAwesome, MdWbSunny } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import axios from "axios";
import { clearUser } from "./slice/user.slice";
import LiquidEther from "./LiquidEther";


function Topbar() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://shoesbackend-4.onrender.com/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      dispatch(clearUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-black">
         <div className="mx-auto flex items-center justify-between px-4 py-4">
           <div className="flex items-center gap-2">
             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600">
               <FaFileMedical className="text-white" />
             </div>
             <span className="text-lg font-semibold text-white">
               RESUME AI
             </span>
           </div>
   
           <nav className="hidden md:flex gap-8 text-white">
             {[
               { to: "/", label: "Home" },
               { to: "/dashboard", label: "Dashboard" },
               { to: "/price", label: "Price" },
               { to: "/about", label: "About" },
             ].map(({ to, label }) => (
               <NavLink
                 key={label}
                 to={to}
                 className={({ isActive }) =>
                   isActive
                     ? "text-orange-500 font-semibold"
                     : "hover:text-orange-500"
                 }
               >
                 {label}
               </NavLink>
             ))}
           </nav>
   
           {user ? (
             <button
               onClick={handleLogout}
               className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
             >
               Logout
             </button>
           ) : (
             <div className="flex gap-3">
               <Link
                 to="/login"
                 className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
               >
                 Sign In
               </Link>
               <Link
                 to="/register"
                 className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
               >
                 Get Started
               </Link>
             </div>
           )}
         </div>
       </header>
  );
}

function StatCards() {
  return (
    <div className="mt-6 px-4">
      <div className="mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <FiTarget />, label: "ATS Score", value: "87%" },
            { icon: <AiOutlineFileText />, label: "Resume Status", value: "Optimized" },
            { icon: <FiZap />, label: "Applications", value: "24" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-black p-4 hover:border-amber-500 transition"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  {item.icon}
                </div>
                <span className="text-xs">{item.label}</span>
              </div>
              <div className="mt-3 text-xl font-bold text-white">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <AiOutlineFileText />,
              title: "Upload New Resume",
              desc: "Start fresh with a new resume upload.",
            },
            {
              icon: <MdAutoAwesome />,
              title: "Optimize Resume",
              desc: "Improve your ATS score and keywords.",
            },
            {
              icon: <FiGlobe />,
              title: "Update Portfolio",
              desc: "Customize your online presence.",
              link: "/upload",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-black p-5 hover:border-amber-500 hover:shadow-md transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {item.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-amber-500">{item.desc}</p>
              {item.link ? (
                <Link to={item.link} className="mt-3 inline-block text-xs font-semibold text-indigo-600">
                  Get Started →
                </Link>
              ) : (
                <button className="mt-3 text-xs font-semibold text-indigo-600">
                  Get Started →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default function Dashboard() {
  const user = useSelector((state) => state.user.userData);
  const [theme ] = useState("dark");

  return (
    <>
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-black"
      }`}
    >

 <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={50}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B19EEF"
        />
      </div>

      <Topbar />

      {user ? (
        <main className="py-6">
          <div className="mx-auto px-4">
            <div className="rounded-2xl border border-yellow-100 p-6">
              <h2 className="text-lg sm:text-xl font-bold">
                <span className="text-amber-500">
                  {user?.FirstName} {user?.LastName}
                </span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                Your resume is performing well. Here are your latest stats and
                quick actions.
              </p>
            </div>
          </div>

          <StatCards />
        </main>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome to ResumeAI Dashboard
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-slate-300">
              Please log in to access your dashboard.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )}
    </div>
    <footer className="bg-black py-10 text-slate-300"> <div className="mx-auto px-4"> <div className="grid gap-8 md:grid-cols-5"> <div className="md:col-span-2"> <div className="flex items-center gap-2"> <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500"> <span className="text-lg font-semibold text-white">AI</span> </div> <span className="text-lg font-semibold tracking-tight text-white"> ResumeAI </span> </div> <p className="mt-3 max-w-sm text-sm text-white"> Transform your career with AI-assisted resume optimization and portfolio generation. </p> <div className="mt-4 flex gap-3 text-sm text-white"> <span className="cursor-pointer hover:text-white">Twitter</span> <span className="cursor-pointer hover:text-white">LinkedIn</span> <span className="cursor-pointer hover:text-white">GitHub</span> </div> </div> <div> <h4 className="text-sm font-semibold text-white">Product</h4> <ul className="mt-3 space-y-2 text-sm text-white"> <li>Features</li> <li>Pricing</li> <li>Templates</li> <li>Changelog</li> </ul> </div> <div> <h4 className="text-sm font-semibold text-white">Company</h4> <ul className="mt-3 space-y-2 text-sm text-white"> <li>About</li> <li>Blog</li> <li>Careers</li> <li>Contact</li> </ul> </div> <div> <h4 className="text-sm font-semibold text-white">Resources</h4> <ul className="mt-3 space-y-2 text-sm text-white"> <li>Documentation</li> <li>Resume Tips</li> <li>ATS Guide</li> <li>API</li> </ul> </div> </div> <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-white md:flex-row"> <span>© 2025 ResumeAI. All rights reserved.</span> </div> </div> </footer>
    </>
  );
}
