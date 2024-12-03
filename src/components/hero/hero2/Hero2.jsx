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
//         product='Requstory helps you write your ‘user story’ fast by simply describing the features of your project/product.'
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
import React, { useState } from 'react';
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
  const [imagesrc] = useState({
    image1: '/images/hero/hero2a.png',
    image2: '/images/hero/hero2b.png',
    image3: '/images/hero/hero2c.png',
    image4: '/images/hero/hero2d.jpg',
    image5: '/images/hero/hero2e.png',
    image6: '/images/hero/hero2f.png',
  });

  const products = [
    {
      imageSrc: imagesrc.image1,
      image2Src: '/images/documobile.png',
      link: 'https://docuhelp.ai/',
      productTitle: 'Docuhelp',
      product: 'DocuHelp helps you write business documents, contact your customers and generate post for your blogs and socials',
    },
    {
      imageSrc: imagesrc.image2,
      image2Src: '/images/requstorymobile.png',
      link: 'https://requstory.com/',
      productTitle: 'Requstory',
      product: 'Requstory helps you write your user story, draw process maps and create prototypes by simply describing the features of your project/product.',
    },
    {
      imageSrc: imagesrc.image5,
      image2Src: '/images/ngrltd-mobile.png',
      link: 'https://ngr.ltd',
      productTitle: 'ngr.ltd',
      product: 'Empowering Nigerian micro, small, and medium enterprises with a user-friendly and affordable web builder platform and marketplace.',
    },
    {
    imageSrc: imagesrc.image6,
    image2Src: '/images/gbrltd-mobile.jpeg',
    link: 'https://gbr.ltd',
    productTitle: 'gbr.ltd',
    product: 'Empowering British micro, small, and medium enterprises with a user-friendly and affordable web builder platform and marketplace.',
  },
  ];

  return (
    <Wrapper>
      <TextBox>
        <TitleStyle>Our Developed Products & Projects</TitleStyle>
        <TextStyle>
          Here are some projects we have led and products we have built.
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
    </Wrapper>
  );
};

export default Hero2;

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #131316;
  padding: 2rem;
`;

const TextBox = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const TitleStyle = styled.h1`
  color: #fafafa;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TextStyle = styled.p`
  color: #e6e6e6;
  font-size: 1.125rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;
