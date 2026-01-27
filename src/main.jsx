import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './Login.jsx'
import Register from './Register.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'
import Payal from "./Upload.jsx"
import AiResumeEditor from "./Aiedit.jsx"
import AtsChecker from "./ATSscore.jsx"
import Home from './App.jsx'
// import AtsResumeTemplate from "./Template.jsx"
import PricingSection from './Price.jsx'
// import ResumeExactTemplate from './Template.jsx'
import ResumePremiumTemplate from './Template.jsx'

const route = createBrowserRouter([
  {
    path : "/" ,
    element : <Home />
  },

 {
      path : "/dashboard" ,
       element : <Dashboard />
 } ,
 {
  path : "/login" ,
   element : <Login />
 },
 {
  path : "/register" ,
  element  : <Register />
 } ,
 {
  path : "/upload" ,
   element : <Payal />
 } ,
 {
  path : "/aiedit" ,
   element  : <AiResumeEditor />
 },
 {
  path : "/atsscore" ,
  element : <AtsChecker />
 },
  {
  path : "/Template" ,
  element : <ResumePremiumTemplate />
 },
 {
  path : "/price",
  element : <PricingSection />
 }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
 <RouterProvider  router={route} />
 </Provider>
  </StrictMode>,
)
