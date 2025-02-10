import { useState } from "react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import AiQuizPrompt from "../components/popup/AiQuizPrompt";
import styled from "styled-components";
import Modal from "../components/popup/Modal";
import AiQuizResultDisplay from "../components/popup/AiQuizResultDisplay";
import { HiOutlineLightBulb } from "react-icons/hi";
import { theme } from "../theme/theme";

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
  min-height: 100vh;
  background: ${theme.gradients.background};
  padding: ${theme.spacing['4xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.border.primary}, transparent);
  }
`;

const QuizContainer = styled.div`
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${theme.spacing.lg} 0;
  
  h2 {
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    margin: 0;
    ${theme.mixins.textGradient}
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.lg};
    margin: ${theme.spacing.sm} 0;
  }
`;

const Button = styled.button`
  background: ${theme.colors.background.surface};
  color: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.border.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.base};

  &:hover {
    background: ${theme.colors.background.surfaceHover};
    border-color: ${theme.colors.border.hover};
    transform: translateY(-2px);
  }

  &.active-question {
    background: ${theme.gradients.primary};
    border-color: transparent;
  }
`;

const QuestionButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const QuestionButton = styled(Button)`
  min-width: 120px;
`;

const QuestionDisplay = styled.div`
  ${theme.mixins.glassmorphism}
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const QuestionContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const QuestionHeader = styled.h3`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.lg};
`;

const QuestionOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const QuestionOptions = styled.div`
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.surface};
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.base};
  color: ${theme.colors.text.primary};

  &:hover {
    background: ${theme.colors.background.surfaceHover};
    border-color: ${theme.colors.border.hover};
  }

  &.selected-option {
    background: ${theme.gradients.primary};
    border-color: transparent;
    color: ${theme.colors.text.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

export default AiQuizPage;
