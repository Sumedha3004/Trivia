import React, { useState } from "react";

const quizData = {
  General: {
    Easy: [
      { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
      { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    ],
    Medium: [
      { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
      { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    ],
    Hard: [
      { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
      { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
    ]
  },
  Science: {
    Easy: [
      { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    ],
    Medium: [
      { question: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Fe", "Pb"], answer: "Au" },
    ],
    Hard: [
      { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], answer: "Mitochondria" },
    ]
  }
};

export default function TriviaQuiz() {
  const [genre, setGenre] = useState("General");
  const [difficulty, setDifficulty] = useState("Easy");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = quizData[genre][difficulty];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {!quizFinished ? (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
          <p className="text-lg">Your score: {score} / {questions.length}</p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setQuizFinished(false);
            }}
            className="mt-4 p-3 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}