import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {quiz} from "reducers/quiz"


export const CurrentQuestion = () => {


  //set state & initial state
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  
  // const answer = useSelector(
  //   (state) => state.quiz.answers[state.quiz.currentQuestionIndex].isCorrect
  // );

  //fetching the whole array of answers
  const answer = useSelector(
    //(state) => state.quiz.answers.find(({questionId}) => question.id === questionId)
    (state) => state.quiz.answers[state.quiz.currentQuestionIndex]
  );
  console.log(answer);

  //"activate" dispatch hook
  const dispatch = useDispatch()

  //function that takes the answerIndex and dispatches the whole object 
  //with question id and answer index to reducer (quiz)
  const handleAnswerButton = (index) => {
    dispatch(quiz.actions.submitAnswer({questionId: question.id, answerIndex: index}))
    // const userAnswer = answer.find(questionId => question.id === questionId)
    

  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      <div>
        {question.options.map((answerOption, index) => {
          return <button type="button" key={index} onClick={() => handleAnswerButton(index)}>{answerOption}</button>;
        })}
      </div>
      {answer && (answer.answerIndex === answer.question.correctAnswerIndex ? <p>The answer is correct</p> : <p>Fail!</p>)}
    </div>
  );
};