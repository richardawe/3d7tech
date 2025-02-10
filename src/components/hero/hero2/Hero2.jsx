// import ImageComponent from './ImageComponent';
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// /**
//  * Hero2 Component
//  *
//  * This component displays a hero section with a title, description,
//  * and multiple images linked to different websites.
//  *
//  * @component
//  * @returns {JSX.Element} The rendered Hero2 component.
//  */

// const Hero2 = () => {
//   const [imagesrc, setImageSrc] = useState({
//     image1: '/images/hero/hero2a.png',
//     image2: '/images/hero/hero2b.png',
//     image3: '/images/hero/hero2c.png',
//     image4: '/images/hero/hero2d.jpg',
//     image5: '/images/hero/hero2e.png',
//   });

//   return (
//     <Wrapper>
//       <TextBox>
//         <TitleStyle>Our Developed Products & Projects.</TitleStyle>
//         <TextStyle>
//           Here are some projects we have led and products we have built.
//         </TextStyle>
//       </TextBox>
//       <ImageComponent
//         imageSrc={imagesrc.image1}
//         image2Src='/images/documobile.png'
//         link='https://docuhelp.ai/'
//         productTitle='Docuhelp'
//         product='DocuHelp helps you write business documents'
//       />
//       <ImageComponent
//         imageSrc={imagesrc.image2}
//         image2Src='/images/requstorymobile.png'
//         link='https://requstory.com/'
//         productTitle='Requstory'
//         product='Requstory helps you write your 'user story' fast by simply describing the features of your project/product.'
//       />
//       <ImageComponent
//         imageSrc={imagesrc.image3}
//         image2Src='/images/jrs-mobile.png'
//         link='https://jrs.3d7tech.com/'
//         productTitle='JRS'
//         product='JRS is a recommender system, that helps individual search for job.'
//       />
//       <ImageComponent
//         imageSrc={imagesrc.image4}
//         image2Src='/images/text2AI-mobile.jpg'
//         link='/text2AI'
//         productTitle='Text2AI'
//         product='Send prompts via SMS and get smart answers instantly'
//       />
//       <ImageComponent
//         imageSrc={imagesrc.image5}
//         image2Src='/images/ngrltd-mobile.png'
//         link='https://ngr.ltd'
//         productTitle='ngr.ltd'
//         product='Empowering Nigerian micro, small, and medium enterprises (MSMEs) with a user-friendly and affordable web builder platform'
//       />
//     </Wrapper>
//   );
// };

// export default Hero2;

// export const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: #131316;

//   @media (max-width: 800px) {
//     width: 100vw;
//     height: auto;
//     position: relative;
//     display: inline-block;
//   }
// `;
// export const TextBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.875rem;
//   margin-top: 6.75rem;
//   width: 50.475rem;
//   @media (max-width: 800px) {
//     width: 100%;
//     margin: auto;
//   }
// `;
// export const TitleStyle = styled.div`
//   color: #fafafa;
//   text-align: center;
//   font-size: 3rem;
//   font-weight: 500;
//   line-height: 140%; /* 4.2rem */
//   letter-spacing: -0.015rem;
//   @media (max-width: 800px) {
//     width: 100%;
//     padding: 1rem;
//     font-size: 2rem;
//   }
// `;
// export const TextStyle = styled.p`
//   color: #e6e6e6;
//   text-align: center;
//   font-size: 1.125rem;
//   font-weight: 400;
//   line-height: 140%; /* 1.575rem */
//   letter-spacing: -0.00563rem;
// `;
import React from 'react';
import styled from 'styled-components';
import ImageComponent from './ImageComponent';

/**
 * Hero2 Component - Grid Layout
 *
 * This component displays a hero section with a title, description,
 * and multiple images in a tiled grid layout.
 *
 * @component
 * @returns {JSX.Element} The rendered Hero2 component.
 */

const Hero2 = () => {
  const products = [
    {
      imageSrc: '/images/hero/hero2a.png',
      image2Src: '/images/documobile.png',
      link: 'https://docuhelp.ai/',
      productTitle: 'Docuhelp',
      product: 'DocuHelp helps you write business documents, contact your customers and generate post for your blogs and socials',
    },
    {
      imageSrc: '/images/hero/hero2b.png',
      image2Src: '/images/requstorymobile.png',
      link: 'https://requstory.com/',
      productTitle: 'Requstory',
      product: 'Requstory helps you write your user story, draw process maps and create prototypes by simply describing the features of your project/product.',
    },
    {
      imageSrc: '/images/hero/hero2e.png',
      image2Src: '/images/ngrltd-mobile.png',
      link: 'https://ngr.ltd',
      productTitle: 'ngr.ltd',
      product: 'Empowering Nigerian micro, small, and medium enterprises with a user-friendly and affordable web builder platform and marketplace.',
    },
    {
      imageSrc: '/images/hero/hero2f.png',
      image2Src: '/images/gbrltd-mobile.jpeg',
      link: 'https://gbr.ltd',
      productTitle: 'gbr.ltd',
      product: 'Empowering British micro, small, and medium enterprises with a user-friendly and affordable web builder platform and marketplace.',
    },
    {
      imageSrc: '/images/hero/hero2g.png',
      image2Src: '/images/Aconter_Logo.png',
      link: 'https://aconter-5e5d8.web.app/',
      productTitle: 'Aconter',
      product: 'Free online accounting software for small businesses, individuals and families that want to keep a record of their day to day transactions.'
    },
  ];

  return (
    <Wrapper>
      <ContentContainer>
        <TextBox>
          <TitleStyle>Our Products & Projects</TitleStyle>
          <TextStyle>
            Discover our innovative solutions built for businesses
          </TextStyle>
        </TextBox>
        <GridContainer>
          {products.map((product, index) => (
            <ImageComponent
              key={index}
              imageSrc={product.imageSrc}
              image2Src={product.image2Src}
              link={product.link}
              productTitle={product.productTitle}
              product={product.product}
            />
          ))}
        </GridContainer>
      </ContentContainer>
    </Wrapper>
  );
};

export default Hero2;

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #0A0A0A, #1E3A8A);
  padding: 8rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.2), transparent);
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const TextBox = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TitleStyle = styled.h2`
  color: #F3F4F6;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TextStyle = styled.p`
  color: #F3F4F6;
  font-size: 1.25rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  letter-spacing: 0.015em;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
