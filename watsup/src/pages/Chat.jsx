import React, { useEffect, useState } from 'react'
import Contacts from '../components/Contacts'
import ChatContainer from '../components/ChatContainer'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Chat() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [currentUser,setCurrentUser] = useState()
  const navigate = useNavigate();

  useEffect(()=>{
    (async()=>{
      try {
        const token = JSON.parse(localStorage.getItem("token"))
       
        const response = await axios.post("http://localhost:5000/user/checkAuth",{token})
        
        if(response.data.status){
          setIsLoggedIn(response.data.status) 
          setCurrentUser(response.data.user)
        }else{
          navigate("/")
        }
      } catch (error) {
        navigate("/")
      }
    })();
  },[isLoggedIn,navigate])
 

  return (
    <>
    {!isLoggedIn && !currentUser ? <div>Loading....</div> :
    
    <div className='bg-red-700 h-screen flex flex-row'>
    <Contacts currentUser={currentUser}/>
    <ChatContainer/>
    </div>
    
    }
    </>
   
  )
}

export default Chat