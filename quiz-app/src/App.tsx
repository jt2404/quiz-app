import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { Difficulty } from "./API";
import { QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import "./App.css";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
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

  const checkAnswer = (ans: string) => {
    console.log("e", ans);
    console.log(questions[number]?.correct_answer);
    const correct = ans == questions[number]?.correct_answer;
    if (correct) {
      console.log("correct");
      setScore((prev) => prev + 1);
    }
    const ansObj = {
      question: questions[number]?.question,
      answer: ans,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, ansObj]);
  };

  const nextQuestion = () => {
    const nextQue = number + 1;
    if (nextQue == TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQue);
    }
  };

  return (
    <div className="m-[50%] border border-black w-[650px] shadow-sm">
      <h1 className="text-center">REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <div
          className="text-center border border-black  mx-auto my-2 w-14 p-2"
          onClick={startTrivia}>
          Start
        </div>
      ) : null}
      {!gameOver ? <p className="score">Score:{score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          callback={checkAnswer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          totalQuestions={TOTAL_QUESTION}
        />
      )}
      {!gameOver &&
        !loading &&
        number != TOTAL_QUESTION &&
        userAnswers.length === number + 1 && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )}
    </div>
  );
}

export default App;
