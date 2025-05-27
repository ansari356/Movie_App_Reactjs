import React from 'react'
import "../scss/_notFound.scss"
import { Link, useNavigate } from 'react-router-dom'
import Lottie from "lottie-react";
import notfound from '../Animations/NotFound.json'

export default function NotFound() {
    const navigate = useNavigate();

  return (
    <>

    <div className='container1'>
    <Lottie animationData={notfound} loop={true} autoplay={true}/>

      <button className='bton' onClick={() => navigate("/")}>Go Back Home</button>
      
    </div>

    </>
  )
}
