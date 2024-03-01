import React, { useState } from 'react'
import { MdEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import axios from "axios"

function Input({currentUser ,chatUser}) {
    const [text,setText] = useState("")

    const sendMsg = async(e)=>{
      e.preventDefault()
      try {

        const response = await axios.post("http://localhost:5000/msg/createMsg",{content:text,sender:currentUser._id,recipient:chatUser._id})

        if(response.data.status){
          setText("")
          alert(response.data.msg)
        }else{
          console.log(response.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
   <>
   <form className="h-20 bg-green-500  flex space-x-4 pt-4 pl-8 " onSubmit={sendMsg} >
     <MdEmojiEmotions className='text-3xl hover:text-red-500 cursor-pointer'/>
     <FaPaperclip  className='text-3xl hover:text-red-500 cursor-pointer'/>
     <input type="search" value={text}  onChange={(e)=>{setText(e.target.value)}} placeholder="Type here....." className=' cursor-pointer h-8 rounded-full w-full p-2 pb-4 '/>
     <MdKeyboardVoice  className='text-3xl hover:text-red-500 cursor-pointer'/>
     <IoIosSend  className='text-3xl hover:text-red-500 cursor-pointer  ' onClick={sendMsg}/>
 </form>
   </>
  )
}

export default Input