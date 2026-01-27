import React from "react";
import { FaFileMedical } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate , NavLink , Link} from "react-router-dom";
import { clearUser } from "./slice/user.slice";
import axios from "axios" ;
import { useSelector } from "react-redux";
const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    highlight: false,
    features: [
      "1 resume optimization",
      "Basic ATS score",
      "Standard templates",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "₹100",
    period: "/month",
    highlight: true,
    tag: "Most Popular",
    features: [
      "Unlimited optimizations",
      "Advanced ATS analysis",
      "Portfolio generator",
      "Premium templates",
      "Priority support",
      "Export to PDF/Word",
    ],
    cta: "Start Free Trial",
  },
];




function PricingSection() {

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
<>

  <header className="w-full  backdrop-blur-3xl bg-black sticky top-0 z-30">
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


    <section id="pricing" className="bg-black h-screen py-16 md:py-20">
      <div className="mx-auto grid place-items-center px-4">
        <div className="mb-10 text-center">
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-white md:text-base">
            No hidden fees. Start with a free plan and upgrade only when you’re
            ready.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3 pl-30">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border bg-black p-6 shadow-sm ${
                plan.highlight
                  ? "border-indigo-500 shadow-indigo-500/30 shadow-xl scale-[1.02]"
                  : "border-slate-100"
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  {plan.tag}
                </div>
              )}
              <h3 className="text-sm font-semibold text-white">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-white">{plan.period}</span>
              </div>
              <p className="mt-1 text-xs text-white">
                {plan.name === "Free"
                  ? "Perfect for trying out the platform."
                  : plan.name === "Pro"
                  ? "For serious job seekers who want the best results."
                  : "Ideal for recruiting teams and agencies."}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-white">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-700">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-6 w-full rounded-full px-4 py-2.5 text-sm font-semibold ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

export default PricingSection ;