import Lottie from 'lottie-react'
import React from 'react'
import signupAnimation from "../lottie/lottieSignup.json"
const LottieAnimation = () => {
  return (
    <div className='w-44 h-44'>
  <Lottie animationData={signupAnimation}></Lottie>
    </div>
  )
}

export default LottieAnimation
