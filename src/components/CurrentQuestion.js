import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "reducers/quiz";
import styled from 'styled-components';


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
  const showSummary = false;

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
    
  const Button = styled.button`
  box-shadow: 0px 1px 0px 0px #97c4fe;
	background: linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
	background-color: #3d94f6;
	border-radius: 6px;
	border: 1px solid #337fed;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-family: 'Space Mono', monospace;
	font-size: 27px;
	font-weight: bold;
	padding:25px 76px;
	text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
  margin: 20px;
  
  &:hover {
   background: linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	 background-color: #1e62d0; 
  }
    
  &:active {
   position:relative;
	 top:1px; 
  }`  
    
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px
  `



  return (
    <Container>
      <h1>Question: {question.questionText}</h1>
      {!answer && // display all options if none has been answered
      <div>
        {question.options.map((answerOption, index) => {
          return <Button type="button" key={index} onClick={() => handleAnswerButton(index)}>{answerOption}</Button>;
        })}
      </div>}
      {answer && (answer.answerIndex === answer.question.correctAnswerIndex ? <p>The answer is correct</p> : <p>Fail!</p>)}
      {answer &&  <Button type="button" onClick={() => dispatch(quiz.actions.goToNextQuestion())}>Next question</Button>}
      {/* {answer &&  <Button type="button" onClick={() => showSummary = True)}>Show your result</Button>} */}
    </Container>
  )   
}
      
