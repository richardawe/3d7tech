import Button from '../button/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Footer from '../footer/Footer';
import NavBar from '../navBar/NavBar';
import SeoMeta from '../SeoMeta';
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

/**
 * ContactUs Component
 *
 * This component represents the contact us page of the website. It includes a form
 * for users to submit inquiries and contact information.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactUs component.
 */

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (!value.trim()) {
      newErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required`;
    } else if (name === 'email' && !isValidEmail(value)) {
      newErrors[name] = 'Invalid email address';
    } else if (name === 'phone' && !isValidPhoneNumber(value)) {
      newErrors[name] = 'Invalid phone number';
    } else {
      newErrors[name] = '';
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      validateField(field, formData[field]);
      if (newErrors[field]) {
        return false;
      }
    }
    return true;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Basic phone number validation regex (digits and optional dashes and spaces)
    const phonePattern = /^[\d- ]+$/;
    return phonePattern.test(phone);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: '',
      });
      setErrors({});
    }
  };

  return (
    <>
      <SeoMeta
        title="Contact Us | 3D7 Technologies"
        description="Get in touch with 3D7 Technologies. We're here to help with AI solutions, consulting, and your digital transformation needs."
        path="/contactUs"
      />
      <NavBar />
      <ContainerStyle fluid>
        <Col lg={12}>
          <Row className='justify-content-center'>
            <TextContainer>
              <Title>Reach out to us</Title>
              <Text>
                We're all ears! Talk to us about your needs, and we'll provide
                the best possible solution.
              </Text>
            </TextContainer>
          </Row>
          <Row>
            <Form onSubmit={handleSubmit}>
              <FormHeader>Get in Touch</FormHeader>
              <FormWrapper>
                <GridContainer>
                  <InputContainer>
                    <Input
                      type='text'
                      id='name'
                      name='name'
                      placeholder='Your first & last name *'
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => validateField('name', formData.name)}
                      required
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Enter your email address *'
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => validateField('email', formData.email)}
                      required
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      type='tel'
                      id='phone'
                      name='phone'
                      placeholder='Phone number *'
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => validateField('phone', formData.phone)}
                      required
                    />
                    {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                  </InputContainer>
                  <InputContainer>
                    <Input
                      type='text'
                      id='website'
                      name='business'
                      placeholder='Company website (optional)'
                      value={formData.business}
                      onChange={handleChange}
                    />
                  </InputContainer>
                </GridContainer>
                <InputContainerMessage>
                  <TextArea
                    id='message'
                    name='message'
                    placeholder='Type your message *'
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => validateField('message', formData.message)}
                    required
                  />
                  {errors.message && (
                    <ErrorMessage>{errors.message}</ErrorMessage>
                  )}
                </InputContainerMessage>
                <Button
                  title='Submit'
                  backgroundColor='#079BE6'
                  textColor='#fff'
                  padding='0.5rem'
                  borderRadius='0.625rem'
                  height='3rem'
                  width='9.375rem'
                  type='submit'
                />
              </FormWrapper>
            </Form>
          </Row>
        </Col>
      </ContainerStyle>
      <Footer />
    </>
  );
};

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 5rem;
  width: 25rem;
  @media (min-width: 280px) and (max-width: 912px) {
    margin-top: 3rem;
    width: 100%;
    font-size: 0.5rem;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 20rem;
  width: 25rem;
  @media (min-width: 280px) and (max-width: 912px) {
    margin: 0;
    width: 100%;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  @media (min-width: 280px) and (max-width: 912px) {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  width: 31.90625rem;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  height: 3.875rem;
  border-radius: 0.625rem;
  border: 0.5px solid rgba(182, 182, 184, 0.4);
  @media (min-width: 280px) and (max-width: 912px) {
    margin: 0;
    width: 100%;
    padding: 0.3rem;
  }
  @media (min-width: 1024px) and (max-width: 1024px) {
    padding: 0.3rem;
    width: 40vw;
  }
`;

const InputContainerMessage = styled.div`
  display: flex;
  width: 65.5625rem;
  height: 11rem;
  padding: 1.25rem 7.5rem 8.4375rem 1rem;
  align-items: center;
  gap: 0.5rem;
  border: 0.5px solid rgba(182, 182, 184, 0.4);
  border-radius: 0.625rem;
  @media (min-width: 280px) and (max-width: 912px) {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.7rem;
    width: 100%;
  }
  @media (min-width: 1024px) and (max-width: 1024px) {
    width: 50vw;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  outline: none;
  width: 100%;
  height: 3rem;
  @media (max-width: 280px) {
    font-size: 0.35rem;
  }
  @media (min-width: 300px) and (max-width: 912px) {
    font-size: 0.6rem;
    padding: 0;
    height: 100%;
  }
  @media (min-width: 1024px) {
    margin: auto;
  }
`;

const TextArea = styled.textarea`
  margin-top: 2rem;
  font-size: 1rem;
  border: none;
  outline: none;
  width: 100%;
  height: auto;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 0.6rem;
  }
`;

const FormWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  height: 22.8rem;
  width: 65.56rem;
  margin: 1rem 5rem;
  @media (min-width: 280px) and (max-width: 912px) {
    margin: 0;
    width: 100%;
  }
`;

const Title = styled.h1`
  color: #0f0f10;
  text-align: center;
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 140%; /* 6.3rem */
  letter-spacing: -0.0225rem;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 2.5rem;
  }
`;

const Text = styled.p`
  color: #0f0f10;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.00625rem;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 1rem;
  }
`;

const Form = styled.div`
  width: 75.5625rem;
  height: 44.375rem;
  flex-shrink: 0;
  border-radius: 2rem;
  background: #fff;
  box-shadow: -8px 4px 50px 2px rgba(0, 0, 0, 0.02),
    8px -8px 50px 2px rgba(0, 0, 0, 0.02);
  margin: 2rem 7rem 16.5rem 7rem;
  @media (min-width: 280px) and (max-width: 912px) {
    width: 100%;
    margin: 0 0 5rem 0;
  }
  @media (min-width: 1024px) {
    margin: auto;
  }
  @media (min-width: 2560px) {
    margin: 3rem auto;
  }
`;

const FormHeader = styled.p`
  color: #0f0f10;
  font-size: 2rem;
  font-weight: 500;
  line-height: 140%; /* 2.8rem */
  letter-spacing: -0.01rem;
  display: flex-end;
  padding: 5rem;
  @media (min-width: 280px) and (max-width: 912px) {
    padding: 2rem;
  }
`;

const TextContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  margin: 5rem 20.6rem;
  width: 50rem;
`;
const ContainerStyle = styled(Container)`
  padding: 1rem;
`;
export default ContactUs;
