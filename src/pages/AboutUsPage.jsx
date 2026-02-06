import React from 'react'
import NavBar from "../components/navBar/NavBar"
import SeoMeta from "../components/SeoMeta";
import Hero from '../components/AboutUs/Hero';
import WhatWeDo from '../components/AboutUs/WhatWeDo'
import OurTeam from '../components/AboutUs/OurTeam';
import Footer from '../components/footer/Footer';
const AboutUsPage = () => {
  return (
    <>
      <SeoMeta
        title="About Us | 3D7 Technologies"
        description="Meet the team behind 3D7 Technologies. We combine innovation and precision to deliver intelligent AI solutions and digital transformation for businesses."
        path="/aboutUs"
      />
          <NavBar />
          <Hero />
          <WhatWeDo />
          <OurTeam />
          <Footer/>
    </>
  );
}

export default AboutUsPage