import Button from '../button/Button';
import Footer from '../footer/Footer';
import NavBar from '../navBar/NavBar';
import React, { useState } from 'react';
import styled from 'styled-components';

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
      // The form is valid, you can submit it to the server or perform other actions here
      // Reset the form data and errors after submission
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
      <NavBar />
      <TextContainer>
        <Title>Reach out to us</Title>
        <Text>
          We're all ears! Talk to us about your needs, and we'll provide the
          best possible solution.
        </Text>
      </TextContainer>
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
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
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
      <Footer />
    </>
  );
};

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 5rem;
  width: 25rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 20rem;
  width: 25rem;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  width: 31.90625rem;
  padding: 1.25rem 7.5rem 1.25rem 1rem;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  height: 3.875rem;
  border-radius: 0.625rem;
  border: 0.5px solid rgba(182, 182, 184, 0.4);
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
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  outline: none;
  width: 100%;
  height: 3rem;
`;

const TextArea = styled.textarea`
  margin-top: 2rem;
  font-size: 1rem;
  border: none;
  outline: none;
  width: 100%;
  height: auto;
`;

const FormWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  height: 22.8rem;
  width: 65.56rem;
  margin: 1rem 5rem;
`;

const Title = styled.h1`
  color: #0f0f10;
  text-align: center;
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 140%; /* 6.3rem */
  letter-spacing: -0.0225rem;
`;

const Text = styled.p`
  color: #0f0f10;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 140%; /* 1.75rem */
  letter-spacing: -0.00625rem;
`;

const Form = styled.h1`
  width: 75.5625rem;
  height: 44.375rem;
  flex-shrink: 0;
  border-radius: 2rem;
  background: #fff;
  box-shadow: -8px 4px 50px 2px rgba(0, 0, 0, 0.02),
    8px -8px 50px 2px rgba(0, 0, 0, 0.02);
  margin: 2rem 7rem 16.5rem 7rem;
`;

const FormHeader = styled.p`
  color: #0f0f10;
  font-size: 2rem;
  font-weight: 500;
  line-height: 140%; /* 2.8rem */
  letter-spacing: -0.01rem;
  display: flex-end;
  padding: 5rem;
`;

const TextContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  margin: 3rem 20.6rem;
  width: 50rem;
`;

export default ContactUs;
