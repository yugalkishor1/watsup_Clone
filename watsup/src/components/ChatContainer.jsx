import React, { useEffect, useState } from 'react'
import Input from './Input'
import axios from "axios"

function ChatContainer({currentUser,chatUser}) {

	console.log("chatUser",chatUser);
	const [msgs,setMsgs] = useState([])
	
	useEffect(()=>{
		(async()=>{
			try {

				const response = await axios.post("http://localhost:5000/msg/getAllMsg",{senderId:currentUser._id,recipientId: chatUser._id})
				
				console.log(response);
				if(response.data.status){
					setMsgs(response.data.allMsg)
				}else{
					console.log(response.data.msg);
				}
			} catch (error) {
				console.log(error.message);
			}
		})()
	},[chatUser,currentUser])
	
	
	
	return (

		<>
		{msgs && (<div className='bg-blue-700 flex-grow w-4/5 flex flex-col'>

		<div className=' pl-12 h-20 bg-green-300 flex items-center space-x-2'>
			<div className='bg-white h-12 w-12 rounded-full'></div>
			<p className=' hover:text-blue-700 cursor-pointer text-xl font-medium'> {chatUser && chatUser.username.toUpperCase()} </p>
		</div> 
		<div className='flex-grow   border-5 border-black'>
			{msgs.map((msg,index)=>( 
			
			(<div
			key={index}
			className={` flex ${msg.sender === currentUser._id ? "justify-end": "justify-start"} text-3xl pt-5  border-red-500 pr-12 border-5`}
			>
				{msg.content}

			</div>)))}
		</div>
		<Input  currentUser={currentUser} chatUser={chatUser}/>
		</div>) }
		
		
		
		</>
)
}

export default ChatContainer