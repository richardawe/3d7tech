import React from "react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import SeoMeta from "../components/SeoMeta";
import News from "../components/News";

const NewsPage = () => {
  return (
    <>
      <SeoMeta
        title="News | 3D7 Technologies"
        description="Latest news, insights, and updates from 3D7 Technologies on AI, machine learning, and digital innovation."
        path="/news"
      />
      <NavBar />
      <News />
      <Footer />
    </>
  );
};

export default NewsPage;
