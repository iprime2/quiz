import React from "react";
import Main from "./Main";
import {nanoid} from 'nanoid';

export default function GetQuestion(props){
    
    function ansToggle(id, answer){
        props.setQues(oldValue => oldValue.map((item) => {
          return item.id === id ?
            {...item,
              selectedAnswer:answer
              }:
            {...item}
        }))
      };

      console.log(props.ques)

    const quesElements = props.ques.map((QuesArray, index) => (
        <Main 
          key={QuesArray.id}
          id={QuesArray.id}
          question={QuesArray.question}
          incorrect_answer={QuesArray.incorrect_answers}
          ansToggle={ansToggle}
          selectedAnswer={QuesArray.selectedAnswer}
          correct_answer={QuesArray.correct_answer}
          showAnswer={QuesArray.showAnswer}
          isAsnwerChecked={props.isAsnwerChecked}
          quizType={props.quizType}
          />
    ));

    return(
        <div>
          {quesElements}
        {props.isAsnwerChecked ?  <h3 className='score'>You score {props.correctAnswewrcount}/5 correct answers</h3>: ''}`
            {props.isAsnwerChecked 
                ?<button 
                  className='btn-primary'
                  onClick={props.restartQuiz}
                  > Restart</button> 
                :
                  <button 
                    className='btn-primary'
                    onClick={props.checkAnswer}
                    > Check Answer</button>}`
        </div>
    );
}