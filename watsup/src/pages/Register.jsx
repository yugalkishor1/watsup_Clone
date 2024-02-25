import React, { useState } from 'react'
import axios from "axios"
import { useNavigate,Link } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const [username,setUsername] = useState("")

	const navigate = useNavigate()

	const handleSubmit =async (e) => {
		e.preventDefault();
		const returnedValue = handleValidation();

		if(returnedValue){
			return
		}

		try {
			const response = await axios.post("http://localhost:5000/user/register",{email,password,username})
			
			if(response.data.status){
				toast.success(`${response.data.msg}`)
				setTimeout(()=>{
					navigate("/")
				},2000)
				
				setEmail("")
				setPassword("")
        		setUsername("")
			}else{
				toast.error(`${response.data.msg}`)
			}

		} catch (error) {
			console.log(error);
		}
	}

	const handleValidation = () => {
		if(password.length<8){
			toast.error("password atleast 8 characters");
			return true
		}
		if(username.length<3){
			toast.error("username atleast 3 characters");
			return true
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
			<ToastContainer 
			closeOnClick
			autoClose={8000}
			theme="dark"
			transition={Bounce}
			/>
		</div>
)
}

export default Register