import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { Difficulty } from "./API";
import { QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correactAnswer: string;
};

const TOTAL_QUESTION = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  console.log("Question", questions);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score:</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {/* <QuestionCard
        questionNumber={number + 1}
        question={questions[number].question}
        answers={questions[number].answers}
        callback={checkAnswer}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        totalQuestions={TOTAL_QUESTION}
      /> */}
      <button className="next">Next Question</button>
    </div>
  );
}

export default App;
