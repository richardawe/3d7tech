import { IoMdCloseCircle } from "react-icons/io";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

/**
 * AiQuizResultDisplay component handles display of quiz results.
 * @param {{ closeModal: Function, quizInfo: Object, quizData:Array, selectedOptions:Object }} props - Props for the AiQuizResultDisplay component.
 * @returns {JSX.Element} JSX for the AiQuizResultDisplay component.
 */

const AiQuizResultDisplay = ({
  closeModal,
  quizInfo,
  quizData,
  selectedOptions,
}) => {
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
            <Row className="row g-0">
              <Column>Question: {cleanText(item?.question) + "?"}</Column>
              <Column>
                Your Answer:
                <span
                  className={
                    quizInfo.correctAnswers.includes(index)
                      ? "green-txt text-center my-1 ms-1"
                      : "text-danger text-center my-1 ms-1"
                  }
                >
                  {cleanText(selectedOptions[index] || "No option selected")}
                </span>
              </Column>
              <Column>
                Correct Answer:
                <span className="green-txt text-center my-1 ms-1">
                  {cleanText(item.correct_answer)}
                </span>
              </Column>
            </Row>
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
  padding-block: 1rem;
`;
const Row = styled.div`
  border: 1px solid black;
  border-radius: 0.2rem;
  margin-inline: 1rem;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);

  @media screen and (min-width:1024px){
    font-size:1.2rem;
  }

  @media screen and (max-width:576px){
    font-size:0.9rem;
  }
}
`;
const Column = styled.div`
  padding-block: 1rem;
  padding-inline: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const Headers = styled.h5`
  margin-block: 1rem;
  text-align: center;

  @media screen and (max-width: 576px) {
    font-size: 1.1rem;
  }
`;
const IoMdCloseCircleStyle = styled(IoMdCloseCircle)`
  height: 2rem;
  width: 2rem;
  color: #cbcccd;
  position: absolute;
  right: 1.2rem;
  top: 1.2rem;
  z-index: 400;

  @media screen and (max-width: 576px) {
    top: 2.3rem;
    right: 1rem;
  }
`;

export default AiQuizResultDisplay;
