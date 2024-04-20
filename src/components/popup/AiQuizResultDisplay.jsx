import axios from "axios";
import Button from "../button/Button";
import { IoMdCloseCircle } from "react-icons/io";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { toast } from "react-toastify";

/**
 * AiQuizResultDisplay component handles display of quiz results.
 * @param {{ closeModal: Function, quizInfo: Object, quizData:Array }} props - Props for the AiQuizResultDisplay component.
 * @returns {JSX.Element} JSX for the AiQuizResultDisplay component.
 */

const AiQuizResultDisplay = ({ closeModal, quizInfo, quizData }) => {
  function cleanText(text) {
    // Remove HTML entities like &amp;, &quot;, in the sample string.
    const decodedText = new DOMParser().parseFromString(text, "text/html")
      .documentElement.textContent;

    // Remove non-alphanumeric characters except spaces
    const cleanedText = decodedText.replace(/[^\w\s]/g, "");

    return cleanedText;
  }
  return (
    <>
      <Container
        className="card mb-3"
        style={{ maxWidth: "50rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdCloseCircleStyle onClick={closeModal} />
        {
          <Headers
            className={quizInfo.finalScore >= 50 ? "green-txt" : "text-danger"}
          >
            {quizInfo.finalScore >= 50
              ? "NICE EFFORT, YOU REALLY KNOW YOUR STUFF"
              : "OH BUMMER, YOU NEED TO STUDY MORE!"}
          </Headers>
        }
        <Headers>
          Score :
          <span
            className={quizInfo.finalScore >= 50 ? "green-txt" : "text-danger"}
          >
            {quizInfo.finalScore}%
          </span>
        </Headers>
        <Headers>Total Questions: {quizData.length}</Headers>
        <Headers>Correct Answers: {quizInfo.correctAnswers.length}</Headers>
        {quizData.map((item, index) => (
          <RowContainer key={index}>
            <Headers>{cleanText(item?.question) + "?"}</Headers>
            <Row className="row g-0">
              <LeftDiv className="col-md-6">
                <InnerContainer className="card-body">
                  <CardTitle className="card-title">Given Answers</CardTitle>
                  {item.incorrect_answers.map((answer) => (
                    <p key={answer}>{cleanText(answer)}</p>
                  ))}
                  <p>{cleanText(item.correct_answer)}</p>
                </InnerContainer>
              </LeftDiv>
              <RightDiv className="col-md-6">
                <InnerContainer className="card-body">
                  <CardTitle className="card-title">Correct Answer</CardTitle>
                  <p>{cleanText(item.correct_answer)}</p>
                </InnerContainer>
              </RightDiv>
            </Row>
            <CardTitle
              className={
                quizInfo.correctAnswers.includes(index)
                  ? "green-txt text-center my-1"
                  : "text-danger text-center my-1"
              }
            >
              {quizInfo.correctAnswers.includes(index) ? "Correct" : "Wrong"}
            </CardTitle>
          </RowContainer>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  overflow-y: auto;
  max-height: 95%;
  position: relative;

  @media screen and (min-width: 1440px) {
    width: 75%;
  }

  @media (max-width: 767px) {
    width: 90%;
    height: 95%;
  }
`;

const RowContainer = styled.div`
  padding-top: 1rem;
`;
const Row = styled.div`
  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
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
const Headers = styled.h5`
  margin-block: 1rem;
  text-align: center;
`;

const LeftDiv = styled.div`
  background-color: #b095e8;
  color: white;
  //   margin-left: 0.1rem;
  @media (max-width: 767px) {
    height: 40%;
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
  background-color: #079be6;
  color: white;
  //   margin-right: 0.1rem;

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

export default AiQuizResultDisplay;
