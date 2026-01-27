import  {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slice/user.slice.jsx"
import resumeReducer from "../slice/Resume.slice.jsx";


export const store = configureStore(
      {
        reducer : {
          
            user : userReducer,
            resume : resumeReducer
           
        }
      }
)