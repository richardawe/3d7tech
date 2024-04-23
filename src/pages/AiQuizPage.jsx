import { useState } from "react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import AiQuizPrompt from "../components/popup/AiQuizPrompt";
import styled from "styled-components";
import Modal from "../components/popup/Modal";
import AiQuizResultDisplay from "../components/popup/AiQuizResultDisplay";
import { HiOutlineLightBulb } from "react-icons/hi";

const AiQuizPage = () => {
  const [showPopUp, setShowPopUp] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizInfo, setQuizInfo] = useState({
    correctAnswers: [],
    finalScore: null,
    hasSubmittedQuiz: false,
    hints: [],
  });
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  const handleSetQuizData = (data) => {
    data.map((item) => {
      randomizeOptions(item.incorrect_answers, item.correct_answer);
    });
    setQuizData(data);
    resetData();
    const rand1 = Math.floor(Math.random() * 10);
    const rand2 = Math.floor(Math.random() * 10);
    setQuizInfo((prevData) => {
      return {
        ...prevData,
        hints: [rand1, rand2],
      };
    });
  };

  function cleanText(text) {
    // Remove HTML entities like &amp;, &quot;, in the sample string.
    const decodedText = new DOMParser().parseFromString(text, "text/html")
      .documentElement.textContent;

    // Remove non-alphanumeric characters except spaces
    const cleanedText = decodedText.replace(/[^\w\s]/g, "");

    return cleanedText;
  }

  const isLastQuestion = () => currentQuestion == quizData.length - 1;

  const handleChangeQuestion = (mode) => {
    if (isLastQuestion()) {
      finishQuiz();
    } else if (mode == "prev") {
      currentQuestion !== 0 ? setCurrentQuestion(currentQuestion - 1) : "";
    } else {
      currentQuestion !== quizData.length - 1
        ? setCurrentQuestion(currentQuestion + 1)
        : "";
    }
    setHiddenOptions([]);
  };

  const handleSelectOption = (option) => {
    setSelectedOptions((prevData) => {
      return {
        ...prevData,
        [currentQuestion]: option,
      };
    });
  };

  const resetData = () => {
    setSelectedOptions([]);
    setQuizInfo({
      correctAnswers: [],
      finalScore: 0,
      hasSubmittedQuiz: false,
    });
    setHiddenOptions([]);
    quizInfo.hasSubmittedQuiz ? setShuffledOptions([]) : "";
    setCurrentQuestion(0);
  };

  const handleSetShowPopup = () => {
    if (quizInfo.hasSubmittedQuiz) {
      resetData();
    } else {
      setShowPopUp(false);
    }
  };

  const randomizeOptions = (incorrect_answers, correct_answer) => {
    const options = [...incorrect_answers, correct_answer];
    const shuffled = shuffleArray(options);
    setShuffledOptions((prevData) => {
      return [...prevData, shuffled];
    });
  };

  function shuffleArray(array) {
    // It's only done once and the length of the array being shuffled is always four so it weigh much on the performance
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const activateHint = (correct_answer) => {
    let count = 0;
    const hiddenOptions = [];
    for (count; count <= 4; count++) {
      if (
        shuffledOptions[currentQuestion][count] !== correct_answer &&
        hiddenOptions.length < 2
      ) {
        hiddenOptions.push(shuffledOptions[currentQuestion][count]);
      }
    }
    setHiddenOptions(hiddenOptions);
  };

  const finishQuiz = () => {
    let finalScore = 0;
    const correctAnswers = [];
    quizData.map((item, index) => {
      if (selectedOptions[index] == item.correct_answer) {
        finalScore++;
        correctAnswers.push(index);
      }
    });
    finalScore = Math.round((finalScore * 100) / quizData.length);
    setQuizInfo({ correctAnswers, finalScore, hasSubmittedQuiz: true });
    setShowPopUp(true);
  };

  return (
    <>
      <NavBar />
      <Container>
        {showPopUp && (
          <Modal clickScreen={() => handleSetShowPopup()}>
            {quizInfo.hasSubmittedQuiz ? (
              <AiQuizResultDisplay
                closeModal={() => {
                  handleSetShowPopup();
                }}
                quizInfo={quizInfo}
                selectedOptions={selectedOptions}
                quizData={quizData}
              />
            ) : (
              <AiQuizPrompt
                closeModal={() => handleSetShowPopup()}
                submitResults={handleSetQuizData}
              />
            )}
          </Modal>
        )}
        {quizData.length !== 0 && !showPopUp && (
          <QuizContainer className="slide">
            <Header className="d-flex justify-content-between my-4 align-items-center">
              <h2>{cleanText(quizData[currentQuestion]?.category)}</h2>
              <Button
                className="rounded-pill"
                onClick={() => setShowPopUp(true)}
              >
                change quiz
              </Button>
            </Header>
            <QuestionButtonContainer>
              {quizData.map((_item, index) => (
                <QuestionButton
                  onClick={() => {
                    setCurrentQuestion(index);
                    setHiddenOptions([]);
                  }}
                  className={index == currentQuestion ? "active-question" : ""}
                  key={index}
                >
                  <span>Question {index + 1}</span>
                </QuestionButton>
              ))}
            </QuestionButtonContainer>
            <QuestionDisplay>
              <QuestionContainer>
                <QuestionHeader>
                  {cleanText(quizData[currentQuestion]?.question) + "?"}
                </QuestionHeader>
                <QuestionOptionsContainer>
                  {shuffledOptions[currentQuestion]?.map((item, index) => (
                    <>
                      <div
                        className={
                          quizInfo.hints.includes(currentQuestion)
                            ? "top-right-custom position-absolute"
                            : "d-none"
                        }
                      >
                        <HiOutlineLightBulb
                          onClick={() => activateHint(item.correct_answer)}
                          className="text-warning display-6"
                        />
                      </div>

                      <QuestionOptions
                        className={`${
                          selectedOptions[currentQuestion] == item &&
                          "selected-option"
                        } ${hiddenOptions.includes(item) && "opacity-0"}`}
                        onClick={() => handleSelectOption(item)}
                        key={index}
                      >
                        {cleanText(item)}
                      </QuestionOptions>
                    </>
                  ))}
                </QuestionOptionsContainer>
              </QuestionContainer>
              <ButtonContainer>
                <Button
                  id="prev-btn"
                  onClick={() => handleChangeQuestion("prev")}
                  className={
                    currentQuestion == 0 ? "opacity-0" : "rounded-pill"
                  }
                >
                  previous question
                </Button>
                <Button
                  onClick={() => handleChangeQuestion("next")}
                  id="next-btn"
                  className="rounded-pill"
                >
                  {isLastQuestion() ? "finish quiz" : "next question"}
                </Button>
              </ButtonContainer>
            </QuestionDisplay>
          </QuizContainer>
        )}
        {!showPopUp && quizData.length == 0 && (
          <Header className="mb-2 align-items-center px-1">
            <Button className="rounded-pill" onClick={() => setShowPopUp(true)}>
              select quiz
            </Button>
            <h2 className="my-1">Looks like you didn't select any quiz</h2>
            <p>Please select at least one quiz to play the game</p>
          </Header>
        )}
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding-top: 5.2rem;
  }
  @media screen and (max-width: 868px) {
    height: auto;
  }
`;
const Header = styled.div`
  @media screen and (max-width: 660px) {
    flex-wrap: wrap;
  }
`;
const QuizContainer = styled.div`
  width: 75%;
`;
const QuestionButtonContainer = styled.div`
  display:flex;
  overflow-x:auto;
  gap:1rem;
  width:50%:

  @media screen and (max-width:768px){
    width:100%;
    flex-wrap:nowrap;
    
  }
`;
const QuestionButton = styled.button`
  text-align: center;
  border-radius: 0.25rem;
  border: none;
  outline: none;
  padding: 1rem 1rem;
  background: #e9ecf09f;
  color: black;
  transition: all 0.3s linear;

  &:hover {
    background: #e9ecf0;
  }

  @media screen and (max-width: 660px) {
    display: inline;
    font-size: 0.9rem;
    width: 100%;
  }
`;
const QuestionDisplay = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.109);
  position: relative;
  margin-block: 1rem;
`;
const QuestionContainer = styled.div`
  margin-top: 2rem;
`;
const QuestionHeader = styled.h2`
  @media screen and (max-width: 576px) {
    font-size: 1.3rem;
  }
`;
const QuestionOptionsContainer = styled.ul`
  margin-top: 1rem;
`;
const QuestionOptions = styled.li`
  list-style-type: none;
  font-size: 1.45rem;
  letter-spacing: 0.1rem;
  width: fit-content;
  color: rgba(0, 0, 0, 0.3);
  margin-top: 1rem;
  transition: all 0.3s linear;
  &:hover {
    color: #079be6;
  }
  @media screen and (max-width: 576px) {
    font-size: 1.2rem;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    overflow-x: auto;
    gap: 0.8rem;
  }
`;
const Button = styled.button`
  border: 1.5px solid #079be6;
  padding-inline: 5rem;
  padding-block: 1rem;
  text-transform: uppercase;
  color: #079be6;
  background: transparent;
  transition: all 0.3s linear;

  &:hover {
    background-color: #079be6;
    color: white;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 3.5rem;
  }
  @media screen and (max-width: 660px) {
    padding-inline: 2.5rem;
    font-size: 0.9rem;
  }
  @media screen and (max-width: 576px) {
    min-width: 250px;
  }
`;

export default AiQuizPage;
