import React from 'react'
import './hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      <video src="/videos/cover.mp4" autoPlay loop muted />
      <h1>Hello</h1>
    </div>
  )
}

export default Hero