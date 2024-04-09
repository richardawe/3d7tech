import React from 'react'
import NavBar from "../components/navBar/NavBar"
import Hero from '../components/AboutUs/Hero';
import WhatWeDo from '../components/AboutUs/WhatWeDo'
import OurTeam from '../components/AboutUs/OurTeam';
import Footer from '../components/footer/Footer';
const AboutUsPage = () => {
  return (
    <>
          <NavBar />
          <Hero />
          <WhatWeDo />
          <OurTeam />
          <Footer/>
    </>
  );
}

export default AboutUsPage