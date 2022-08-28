import React from "react";
import { decode } from 'html-entities';
import tickIcon from "../assets/images/tick.svg";
import crossIcon from "../assets/images/cross.svg";

const Main = props => {
    const [quizType, setQuizType] = React.useState(props.quizType)
    /*const [combineQuestions, setCombine] = React.useState(props.incorrect_answer)
    setCombine(prev => {
        return combineQuestions.map(item => {
            return item === props.correct_answer ?
                [...prev]:
                [...prev, props.correct_answer]
            })
        })*/


    /*function checkQuizType()
    {if (props.quizType === Boolean) {
        const selectedAnswerClass = 
            `${props.selectedAnswer === props.incorrect_answer ?
             "ans-btn ans-selected" : "ans-btn"}
             ${props.showAnswer && props.selectedAnswer === props.incorrect_answer ?
            "ans-btn btn-incorrect":""}`;

       const incorrectAnswerElements = 
            <button 
                id={props.incorrect_answer}
                className={selectedAnswerClass}
                onClick={() => props.ansToggle(props.id, props.incorrect_answer)}
                >{unescape(props.incorrect_answer)} </button>

    }else{*/
    const incorrectAnswerElements = props.incorrect_answer.map(answer => {
    const selectedAnswerClass = 
        `${props.selectedAnswer === answer ?
            "ans-btn ans-selected" : "ans-btn"}
            ${props.showAnswer && props.selectedAnswer === answer ?
        "ans-btn btn-incorrect":""}`;
    return <button 
        id={answer}
        className={selectedAnswerClass}
        value={answer.allAnswer}
        onClick={() => props.ansToggle(props.id, answer)}
        >{decode(answer)} </button>
    });

    const correctAnswerClass = 
            `${props.selectedAnswer === props.correct_answer ?
             "ans-btn ans-selected" : "ans-btn"}
             ${props.showAnswer ?
                "ans-btn btn-correct":""}`;

    const correctAnswerElements = 
        <button 
            id={props.correct_answer}
            className={correctAnswerClass}
            onClick={() => props.ansToggle(props.id, props.correct_answer)}
            >{unescape(props.incorrect_answer)} </button>


    incorrectAnswerElements.push(correctAnswerElements)

    /*const sortedAnswerElements = Array.from(incorrectAnswerElements).sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);*/

    
    /*const FinalAnswerElements = combineQuestions.map(answer => {
        const selectedAnswerClass = 
            `${answer === props.correct_answer ?
                console.log("answer true"):'ans-btn btn-incorrect'}`;
        
        //{console.log(selectedAnswerClass)}
        return <button 
        id={answer}
        className={selectedAnswerClass}
        value={answer.allAnswer}
        onClick={() => props.ansToggle(props.id, answer)}
        >{unescape(answer)} </button>
    })*/


    return(
        <article className="question-container">
            <div className="question-container2">
                <h3 className="main-ques">{decode(props.question)}</h3>
                <div className="btn-container">
                    {incorrectAnswerElements}
                    {
                props.showAnswer &&
                (props.selectedAnswer === props.correct_answer
                ? <img src={tickIcon} className="tick" width={35} alt="Tick, correct answer" />
                : <img src={crossIcon} className="tick" width={30} alt="Cross, wrong answer" />)
            }    
                </div>
            </div>
            
               
        </article>
    );
}

export default Main;