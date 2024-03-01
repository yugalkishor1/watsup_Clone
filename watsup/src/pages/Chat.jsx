import React, { useEffect, useState } from 'react'
import Contacts from '../components/Contacts'
import ChatContainer from '../components/ChatContainer'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Chat() {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [currentUser,setCurrentUser] = useState()
    const [currentUserName,setCurrentUserName] = useState()
    const [allUsers,setAllUsers] = useState([])
    const [chatUser,setChatUser] = useState(null)
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
        },[])


    useEffect(() => {
       
    if (currentUser && currentUser.username) {
        setCurrentUserName(currentUser.username);
    }
    }, [currentUser]);


    useEffect(()=>{
     
    {currentUser && 
        (async()=>{
            try {
                const response = await axios.get("http://localhost:5000/user/allUsers")
                setAllUsers(response.data.allUsers)
            } catch (error) {
                console.log(error.message);
            }
         
        })();
    }
    },[currentUser])
        
    const handleChat = (user)=>{
        setChatUser(user)
    }
    
    return (
        <>
        {isLoggedIn && currentUser ? 

        (<div className='bg-red-700 h-screen flex flex-row'>
        <Contacts currentUser={currentUser} allUsers={allUsers} handleChat={handleChat}/>
        {
            chatUser ?  (<ChatContainer currentUser={currentUser} chatUser={chatUser}/>) : (<h1 className=' w-4/5 flex items-center justify-center'> Welcome {currentUser.username.toUpperCase()}</h1>)
        }
        
        </div>) :
       
        (<div>Loading....</div>)

        }
        </>
    )
}   

export default Chat