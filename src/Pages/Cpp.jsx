import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Gk.css";

const Cpp = () => {
  
  const location = useLocation();
  const userName = location.state?.userName || "Your";
  const navigate = useNavigate();
  const GoToIntro = () => {
    navigate('/');  // Redirect to the Intro page
  };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Which of the following is the correct extension for a C++ file?",
      options: [".c", ".cpp", ".java", ".py"],
      correctAnswer: ".cpp",
    },
    {
      question: "What is the output of 'cout << 5 / 2;' in C++?",
      options: ["2.5", "2", "2.0", "Error"],
      correctAnswer: "2",
    },
    {
      question: "Which feature in C++ allows multiple functions to have the same name but different parameters?",
      options: ["Function Overloading", "Encapsulation", "Polymorphism", "Inheritance"],
      correctAnswer: "Function Overloading",
    },
    {
      question: "Which operator is used to access the address of a variable in C++?",
      options: ["*", "&", "->", "%"],
      correctAnswer: "&",
    },
    {
      question: "Which of the following is a correct way to declare a pointer in C++?",
      options: ["int ptr;", "int *ptr;", "pointer<int> ptr;", "int ptr*;"],
      correctAnswer: "int *ptr;",
    },
  ];
  

  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setShowResults(false);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="quiz-card">
        <div className="progress-container">
          <div className="progress-header">
            <p>
              Question {currentQuestionIndex + 1}/{questions.length}
            </p>
          </div>
          <div className="progress-bg">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div className="quiz-card">
        <h1 className="quiz-title">Quiz Results</h1>
        <p className="quiz-subtitle">
          {userName}'s Score: {score}/{questions.length}
        </p>
        <p className="quiz-subtitle">
          {score === questions.length
            ? "Perfect score! Congratulations!"
            : score >= questions.length / 2
            ? "Good job!"
            : "Better luck next time!"}
        </p>

        <div className="results-container">
          <h2 className="results-heading">Your Answers:</h2>
          {answers.map((answer, index) => (
            <div key={index} className="answer-item">
              <p className="answer-question">
                Question {index + 1}: {answer.question}
              </p>
              <p
                className={
                  answer.isCorrect ? "answer-correct" : "answer-incorrect"
                }
              >
                Your answer: {answer.selectedAnswer}
              </p>
              {!answer.isCorrect && (
                <p className="correct-answer">
                  Correct answer: {answer.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>

        <button className="action-button" onClick={handleRestartQuiz}>
          Play Again
        </button>
        <br />
        <button className="action-button" onClick={GoToIntro}>
  Go to Home
</button>

      </div>
    );
  };

  return (
    <div className="quiz-container">
      {showResults ? renderResults() : renderQuestion()}
    </div>
  );
};

export default Cpp;
