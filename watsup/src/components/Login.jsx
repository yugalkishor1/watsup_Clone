import React, { useState } from 'react'
import axios from "axios"
import { useNavigate,Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const navigate = useNavigate()

	const handleSubmit =async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post("http://localhost:5000/user/login",{email,password})
			
			if(response.data.status){
				localStorage.setItem("token",JSON.stringify(response.data.token))
				toast.success(`${response.data.msg}`)

				setTimeout(()=>{
					navigate("/chat")
				},2000)
				
				setEmail("")
				setPassword("")
			}else{
				toast.error(`${response.data.msg}`)
			}

		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div className='bg-red-700 border-5 border-black flex-grow w-2/5 flex items-center justify-center flex-col'>
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

				<input type="submit" className='px-2 py-2 mb-5 border border-black border-5 hover:bg-red-900 hover:text-white hover:border-white rounded-md cursor-pointer' />

			</form>
			

			<p> Do not have an Account ?
			<Link to={'/register'} className='hover:text-white hover:underline'>Register</Link>
			</p>
			<ToastContainer 
			closeOnClick
			autoClose={2000}
			/>
		</div>
)
}

export default Login