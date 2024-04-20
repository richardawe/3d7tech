import axios from "axios";
import Button from "../button/Button";
import { IoMdCloseCircle } from "react-icons/io";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { toast } from "react-toastify";

/**
 * AiQuizPrompt component handles selecting & fetching quiz questions.
 * @param {{ closeModal: Function,submitResults:Function }} props - Props for the AiQuizPrompt component.
 * @returns {JSX.Element} JSX for the AiQuizPrompt component.
 */

const AiQuizPrompt = ({ closeModal, submitResults }) => {
  const [category, setCategory] = useState("");

  const categories = [
    { value: "", text: "Select a category" },
    { value: 9, text: "General Knowledge" },
    { value: 10, text: "Entertainment: Books" },
    { value: 11, text: "Entertainment: Film" },
    { value: 12, text: "Entertainment: Music" },
    { value: 14, text: "Entertainment: Television" },
    { value: 15, text: "Entertainment: Video Games" },
    { value: 16, text: "Entertainment: Board Games" },
    { value: 17, text: "Science & Nature" },
    { value: 18, text: "Science: Computers" },
    { value: 20, text: "Mythology" },
    { value: 21, text: "Sports" },
    { value: 22, text: "Geography" },
    { value: 23, text: "History" },
    { value: 25, text: "Art" },
    { value: 26, text: "Celebrities" },
    { value: 27, text: "Animals" },
    { value: 28, text: "Vehicles" },
    { value: 29, text: "Comics" },
    { value: 30, text: "Science: Gadgets" },
    { value: 31, text: "Japanese Anime & Manga" },
    { value: 32, text: "Cartoon & Animations" },
  ];

  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        submitResults(response.data.results);
        closeModal();
        toast.success("Your questions are ready", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error(
          "Error fetching questions:",
          response.status,
          response.statusText
        );
        toast.error(
          "There was an error fetching your questions, Kindly refresh the browser and try again",
          {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <>
      <Container
        className="card mb-3"
        style={{ maxWidth: "50rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdCloseCircleStyle onClick={closeModal} />
        <Row className="row g-0">
          <LeftDiv className="col-md-6">
            <Image
              src="/images/popupImg.jpg"
              className="img-fluid rounded-start"
              alt="pop-up image"
            />
          </LeftDiv>
          <RightDiv className="col-md-6">
            <InnerContainer className="card-body">
              <CardTitle className="card-title">Welcome</CardTitle>
              <PStyle className="card-text">
                Pick the topic you'd like the quiz to be based on
              </PStyle>
              <Rule />

              <InputArea onSubmit={handleSubmit}>
                <label>
                  <SelectStyle
                    value={category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </SelectStyle>
                </label>

                <Button
                  title="Generate"
                  backgroundColor="#079BE6"
                  textColor="#fff"
                  padding=" 0.5rem"
                  borderRadius="0.5rem"
                  height="2.5rem"
                  width="7.5rem"
                  type="submit"
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
    height: 103%;
    width: 100%;
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
    gap: 0.5rem;
    margin: 1rem;
    align-items: center;
  }
`;
const SelectStyle = styled.select`
  display: flex;
  padding: 1rem;
  align-items: center;
  border-radius: 0.5rem;
  border: 0.6px solid rgba(182, 182, 184, 0.6);
  gap: 0.5rem;
  margin-top: 1rem;
  &&:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    padding: 0.8rem 2.2rem;
  }
  @media (max-width: 576px) {
    padding-block: 1rem;
    padding-inline: 0.3rem;
    width: 100%;
    margin-block: 1rem;
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
  z-index: 400;
`;

export default AiQuizPrompt;
