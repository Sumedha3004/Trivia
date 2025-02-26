import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Gk.css";

const Sports = () => {
  
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
      question: "Who is known as the 'God of Cricket'?",
      options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "M.S. Dhoni"],
      correctAnswer: "Sachin Tendulkar",
    },
    {
      question: "Which country won the first-ever ICC Cricket World Cup in 1975?",
      options: ["India", "Australia", "West Indies", "England"],
      correctAnswer: "West Indies",
    },
    {
      question: "How many players are there in a cricket team?",
      options: ["9", "10", "11", "12"],
      correctAnswer: "11",
    },
    {
      question: "Which bowler has taken the most wickets in Test cricket?",
      options: ["Shane Warne", "Anil Kumble", "James Anderson", "Muttiah Muralitharan"],
      correctAnswer: "Muttiah Muralitharan",
    },
    {
      question: "What is the highest individual score in One Day Internationals (ODIs)?",
      options: ["264", "200", "237", "275"],
      correctAnswer: "264",
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

export default Sports;
