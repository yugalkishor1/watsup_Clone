import React from 'react'
import Welcome from "../components/Welcome"
import Login from "../components/Login"

function Home() {
  return (
    <div className='flex flex-row w-full h-screen bg-green-700'>
    <Welcome/>
    <Login/>
    </div>
  )
}

export default Home