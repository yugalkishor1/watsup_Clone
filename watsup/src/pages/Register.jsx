import React, { useState } from 'react'
import axios from "axios"
import { useNavigate,Link } from 'react-router-dom'

function Register() {

	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const [username,setUsername] = useState("")

	const navigate = useNavigate()

	const handleSubmit =async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/user/register",{email,password,username})
			
			if(response.data.status){
				navigate("/")
				setEmail("")
				setPassword("")
        		setUsername("")
			}else{
				console.log("Response",response.data);
			}

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='bg-red-700 border-5 border-black flex-grow h-screen flex items-center justify-center flex-col'>
			<form 
			onSubmit={handleSubmit}
			className='flex flex-col '
			>

				<input className='px-1 py-3 mb-5 rounded-md cursor-pointer'
				type="email" 
				placeholder='email'
				value={email}
				onChange={(e)=>setEmail(e.target.value)}
				/>

				<input className='px-1 py-3 mb-5 rounded-md cursor-pointer'
				type="text" 
				placeholder='password'
				value={password}
				onChange={(e)=>setPassword(e.target.value)}
				/>
				<input className='px-1 py-3 mb-5 rounded-md cursor-pointer'
				type="text" 
				placeholder='username'
				value={username}
				onChange={(e)=>setUsername(e.target.value)}
				/>

				<input type="submit" className='px-2 py-2 mb-5 border border-black border-5 hover:bg-red-900 hover:text-white hover:border-white rounded-md cursor-pointer' />

			</form>
			

			<p> Already have an Account ?
			<Link to={'/'} className='hover:text-white hover:underline'>Login</Link>
			</p>
		</div>
)
}

export default Register