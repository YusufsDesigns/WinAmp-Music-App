import React from 'react'
import { useNavigate } from 'react-router-dom'


const Error = () => {

  const navigate = useNavigate()

  // on click, Go back to home
  const handleError = () => {
    navigate('/')
  }
  return (
    <div class="flex flex-col space-y-2 items-center justify-center bg-mid-black w-full h-screen text-white font-poppins"><span>Something went wrong. Please reload</span><button class="bg-red text-white py-2 px-5 rounded" onClick={handleError}>Reload</button></div>
  )
}

export default Error