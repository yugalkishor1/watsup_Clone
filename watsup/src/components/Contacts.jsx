import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function Contacts({currentUser,allUsers,handleChat}) {

	const navigate = useNavigate()
	const [selectedUser,setSelectedUser] = useState()
	const [currentUserName,setCurrentUserName] = useState()
	const [search,setSearch] = useState("")
	const [queryResult,setQueryResult] = useState([])

	useEffect(()=>{
		setCurrentUserName(currentUser.username)
	},[currentUser])

	const handleClick = (user) => {
		handleChat(user)
		setSelectedUser(user)
	}

	const logout = () => {
        localStorage.removeItem("token")
		navigate("/")
    } 

	useEffect(()=>{
		
		(async()=>{
			try {
				const response = await axios.post("http://localhost:5000/user/queryUsers",{search})
				if(response.data.status){
					setQueryResult(response.data.users)
				}else{
					console.log("Error",response.data.msg);
				}
			} catch (error) {
				console.log(error.message);
			}
		})()
	},[search])

	return (
		
	<div className='bg-red-700 flex-grow w-1/5 flex flex-col'>

		<div className='h-20 flex items-center justify-center rounded-full p-4'>
			<CiSearch className='text-lg mr-2 hover:text-red-300'/>
			<input type="search" className='rounded-full h-8 w-60 pl-4 pb-1 hover:bg-gray-300' placeholder='Search....'
			value={search}
			onChange={(e)=>{setSearch(e.target.value)}}
			/>
		</div>

		{
			queryResult.length > 0 ? 
			
			<div className=' flex-grow bg-red-500 overflow-auto'>
			{ queryResult.map((user,index)=>(
			
				<div 
				key={index} 
				className={`flex p-4 items-center space-x-2 border-white border-2 hover:bg-red-700 ${ selectedUser && selectedUser.username == user.username? "bg-red-700" : ""}`}
				onClick={()=>{handleClick(user)}}
				>
					<div className={`bg-white h-12 w-12 rounded-full hover:bg-gray-300 cursor-pointer flex items-center justify-center ${ selectedUser && selectedUser.username == user.username? "bg-pink-300" : ""}   `}>
						{user && user.image ? <img src="" className='object-contain'/>: <p className={`${ selectedUser && selectedUser.username == user.username? "text-blue-700" : ""} text-2xl hover:text-blue-700 font-medium`}>{(user.username.charAt(0)).toUpperCase()}</p>}
					</div>

					<div className='hover:text-white cursor-pointer'>
						{user.username.toUpperCase()}
					</div>
				</div>
			))
			}
			</div> 
			
			:  		
			<div className=' flex-grow bg-red-500 overflow-auto'>
			{allUsers.length>0 && allUsers.map((user,index)=>(
			
				<div 
				key={index} 
				className={`flex p-4 items-center space-x-2 border-white border-2 hover:bg-red-700 ${ selectedUser && selectedUser.username == user.username? "bg-red-700" : ""}`}
				onClick={()=>{handleClick(user)}}
				>
					<div className={`bg-white h-12 w-12 rounded-full hover:bg-gray-300 cursor-pointer flex items-center justify-center ${ selectedUser && selectedUser.username == user.username? "bg-pink-300" : ""}   `}>
						{user && user.image ? <img src="" className='object-contain'/>: <p className={`${ selectedUser && selectedUser.username == user.username? "text-blue-700" : ""} text-2xl hover:text-blue-700 font-medium`}>{(user.username.charAt(0)).toUpperCase()}</p>}
					</div>

					<div className='hover:text-white cursor-pointer'>
						{user.username.toUpperCase()}
					</div>
				</div>
			))
			}
			</div>
		}

		<div className='h-20 p-12 flex items-center justify-center space-x-4 pr-12 overflow-hidden'>
			<div className='bg-white h-12 w-12 rounded-full'>
				{currentUser&&currentUser.image&&<img src=""  className='object-contain'/>}
			</div>
			<div>
				{currentUserName && currentUserName.toUpperCase()}
			</div>
			<button 
			className='bg-white p-2 rounded-md hover:bg-black hover:text-white'
			onClick={logout}
			>Logout</button>
		</div>
	</div>

)
}

export default Contacts