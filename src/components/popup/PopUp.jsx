import axios from 'axios';
import Button from '../button/Button';
import { IoMdCloseCircle } from 'react-icons/io';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { toast } from 'react-toastify';

/**
 * PopUp component handles form submission.
 * @param {{ closeModal: Function }} props - Props for the PopUp component.
 * @returns {JSX.Element} JSX for the PopUp component.
 */

const apiKey = import.meta.env.VITE_API_KEY;
const portalId = import.meta.env.VITE_PORTAL_ID;
const formId = import.meta.env.VITE_FORM_ID;

const PopUp = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    firstname: '', //naming is from hubspot backend
    email: '',
    company: '', // This is for the message. I had to use company as this is what was available on hubspot.
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hubSpotField = () => {
    return {
      portalId,
      formId,
      fields: [
        {
          name: 'firstname',
          value: formData.firstname,
        },
        {
          name: 'email',
          value: formData.email,
        },
        {
          name: 'company',
          value: formData.company,
        },
      ],
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${String(
          portalId
        )}/${formId}`,
        hubSpotField(),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log('formData:', formData);
      if (response.status === 200) {
        console.log('Details submitted successfully!');
        setSubmitted(true);
        setErrorMessage('');
        toast.success('Thank you for signing up!', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setFormData({
          firstname: '',
          email: '',
          company: '',
        });
      } else {
        console.error(
          'Error submitting details:',
          response.status,
          response.statusText
        );
        setErrorMessage('Something went wrong. Please try again later.');
        setSubmitted(false);
      }
    } catch (error) {
      console.error('Error submitting details:', error);
      setErrorMessage('Something went wrong. Please try again later.');
      setSubmitted(false);
    }
  };

  return (
    <>
      <Container
        className='card mb-3'
        style={{ maxWidth: '50rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdCloseCircleStyle onClick={closeModal} />
        <Row className='row g-0'>
          <LeftDiv className='col-md-6'>
            <Image
              src='/images/popupImg.jpg'
              className='img-fluid rounded-start'
              alt='pop-up image'
            />
          </LeftDiv>
          <RightDiv className='col-md-6'>
            <InnerContainer className='card-body'>
              <CardTitle className='card-title'>Let’s talk</CardTitle>
              <PStyle className='card-text'>
                Build & Ship AI Systems With 3D7Tech!
              </PStyle>
              <Rule />

              <InputArea onSubmit={handleSubmit}>
                <label>
                  <InputStyle
                    type='text'
                    id='name'
                    name='firstname'
                    placeholder='Your first & last name *'
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <InputStyle
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter your email address *'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <TextAreaStyle
                    id='message'
                    name='company'
                    placeholder='Your message...'
                    value={formData.company}
                    onChange={handleChange}
                  />
                </label>

                <Button
                  title="Let's talk"
                  backgroundColor='#079BE6'
                  textColor='#fff'
                  padding=' 0.5rem'
                  borderRadius='0.5rem'
                  height='2.5rem'
                  width='7.5rem'
                  type='submit'
                />
              </InputArea>
            </InnerContainer>
          </RightDiv>
        </Row>
      </Container>
    </>
  );
};

const Container = styled.div`
  @media (max-width: 767px) {
    width: 90%;
    height: 95%;
  }
`;

const Row = styled.div`
  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
`;
const Rule = styled.div`
  border: 0.25rem solid #079be6;
  width: 17rem;

  @media (max-width: 767px) {
    width: 12rem;
    margin: 0 auto;
  }
`;
const InnerContainer = styled.div`
  margin-top: 2rem;
  &.card-body {
    @media (max-width: 767px) {
      margin-top: 0rem;
    }
  }
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  @media (max-width: 767px) {
    height: 105%;
  }
`;

const LeftDiv = styled.div`
  @media (max-width: 767px) {
    height: 40%;
  }
`;
const PStyle = styled.p`
  color: #4a4a4f;
  font-size: 1rem;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.005rem;
  margin-bottom: 1rem;
  &.card-text {
    @media (max-width: 767px) {
      text-align: center;
    }
  }
`;
const InputArea = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  @media (max-width: 767px) {
    gap: 1rem;
    margin: 1rem;
    align-items: center;
  }
`;

const InputStyle = styled.input`
  display: flex;
  padding: 1rem 7.5rem 1rem 1rem;
  align-items: center;
  border-radius: 0.5rem;
  border: 0.6px solid rgba(182, 182, 184, 0.6);
  gap: 0.5rem;
  &&:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    padding: 0.8rem 2.2rem;
  }
`;
const TextAreaStyle = styled.textarea`
  display: flex;
  padding: 1rem 7.5rem 2.75rem 1rem;
  align-items: center;
  border-radius: 0.5rem;
  border: 0.6px solid rgba(182, 182, 184, 0.6);

  gap: 0.5rem;
  &&:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    padding: 0.8rem 2.2rem;
  }
`;
const CardTitle = styled.h5`
  font-size: 2rem;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.01rem;
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
`;
const RightDiv = styled.div`
  position: relative;
  @media (max-width: 767px) {
  }
`;
const IoMdCloseCircleStyle = styled(IoMdCloseCircle)`
  height: 2rem;
  width: 2rem;
  color: #cbcccd;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`;

export default PopUp;
