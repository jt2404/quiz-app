import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
};

// https://opentdb.com/api.php?amount=10&type=multiple

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  console.log(answers, question);
  return (
    <div className="">
      <p className="number">
        Question: {questionNumber}/{totalQuestions}
      </p>
      <div>{question}</div>
      <div>
        {answers.map((ans, index) => (
          <button
            key={index}
            onClick={() => {
              callback(ans);
            }}>
            {ans}
          </button>
        ))}
      </div>
      {/* <p dangerouslySetInnerHTML={{ __html: question }}></p>
      
      <div>
        {answers?.map((ans) => (
          <div>
            <div onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: ans }}></span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default QuestionCard;
