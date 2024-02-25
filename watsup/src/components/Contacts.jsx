import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from "axios"

function Contacts({currentUser}) {
	const [currentUserName,setCurrentUserName] = useState()
	const [allUsers,setAllUsers] = useState([])

	useEffect(() => {
	if (currentUser && currentUser.username) {
		setCurrentUserName(currentUser.username);
	}
	}, [currentUser]);

	useEffect(()=>{
	{currentUser && 
		(async()=>{
		const response = await axios.get("http://localhost:5000/user/allUsers")
		setAllUsers(response.data.allUsers)
		})();
	}

	},[])

	return (
		
		
	<div className='bg-red-700 flex-grow w-1/5 flex flex-col'>

		<div className='h-20 flex items-center justify-center rounded-full p-4'>
			<CiSearch className='text-lg mr-2 hover:text-red-300'/>
			<input type="search" className='rounded-full h-8 w-60 pl-4 pb-1 hover:bg-gray-300' placeholder='Search....' />
		</div>

		<div className=' flex-grow bg-red-500 overflow-auto'>
			{allUsers.length>0 && allUsers.map((user,index)=>(
			
				<div 
				key={index} 
				className='flex p-4 items-center space-x-2 border-white border-2 hover:bg-red-700'
				>
					<div className='bg-white h-12 w-12 rounded-full hover:bg-gray-300 cursor-pointer  '>
						{user&&user.image&&<img src=""  className='object-contain'/>}
					</div>

					<div className='hover:text-white cursor-pointer'>
						{user.username.toUpperCase()}
					</div>
				</div>
			))
			}
		</div>

		<div className='h-20 p-12 flex items-center justify-center space-x-4 pr-12 overflow-hidden'>
			<div className='bg-white h-12 w-12 rounded-full'>
				{currentUser&&currentUser.image&&<img src=""  className='object-contain'/>}
			</div>
			<div>
				{currentUserName && currentUserName.toUpperCase()}
			</div>
		</div>
	</div>

)
}

export default Contacts