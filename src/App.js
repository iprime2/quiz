
import './App.css';
import React from 'react';
import Main from './components/Main';
import {nanoid} from 'nanoid';
import shapeTop from "./assets/images/shape-1.png";
import shapeBottom from "./assets/images/shape-2.png";
import Question from './components/getQuestion'


function App(props) {
  
  const [ques, setQues] = React.useState([])
  const [questionTypeData,setQuestionTypeData] = React.useState({
    category:"",
    difficulty:"",
    type:""
  })
  const [quizType, setQuizType] = React.useState(false)
  const [start,setStart] = React.useState(true)
  const [url,setUrl] = React.useState("")
  const [isAsnwerChecked, setAnswerChecked] = React.useState(false)
  const [restart, setRestart] = React.useState(false)
  const [correctAnswewrcount, setCorrectAnswercount] = React.useState(0)
  const allQuestionAnswered = ques.every(question => question.selectedAnswer != "")
  
  React.useEffect(() => {
    setRestart(false)
    async function getQues(){
    const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${questionTypeData.category}&difficulty=${questionTypeData.difficulty}&type=${questionTypeData.type}`)
    const data = await res.json()
    setQues(data.results.map(question => {
      return{
        ...question,
        id:nanoid(),
        selectedAnswer: "",
        showAnswer: false,
      }}))
    }
    getQues()
  }, [restart]);
  
  /*https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple*/

  React.useEffect(() => {
    if(ques.length !== 0 && allQuestionAnswered){
      let count = 0
      ques.forEach(question => {
        if(question.correct_answer === question.selectedAnswer)
          count++
      })
      setCorrectAnswercount(count)
    }
  }, [isAsnwerChecked]);

  function handleChange(event){
    const {value, name} = event.target
    setQuestionTypeData(prev =>{
        return{
        ...prev,
        [name]: value
        }
    })
    if (questionTypeData.type == Boolean){
      setQuizType(Boolean)
    }
  };

  function handleGameStart(){
    setStart(false)
    
    setUrl(`https://opentdb.com/api.php?amount=5&category=${questionTypeData.difficulty}&difficulty=${questionTypeData.difficulty}&type=${questionTypeData.difficulty}`)
  };

  function ansToggle(id, answer){
    setQues(oldValue => oldValue.map(item => {
      return item.id === id ?
        {...item,
          selectedAnswer:answer
          }:
        {...item}
    }))
  };


  
  const quesElements = ques.map((QuesArray, index) => (
    <Main 
      key={QuesArray.id}
      id={QuesArray.id}
      question={QuesArray.question}
      incorrect_answer={QuesArray.incorrect_answers}
      ansToggle={ansToggle}
      selectedAnswer={QuesArray.selectedAnswer}
      correct_answer={QuesArray.correct_answer}
      showAnswer={QuesArray.showAnswer}
      isAsnwerChecked={isAsnwerChecked}
      quizType={quizType}
      />

  ));

  function checkAnswer(){
    setAnswerChecked(true)
    return setQues(prevQues => 
      prevQues.map(items => {
      return {
        ...items,
        showAnswer: !items.showAnswer
      }
    }))
  };



  function restartQuiz(){
    setAnswerChecked(false)
    setRestart(true)
    setStart(true)
    /*setQuestionTypeData(prev => ({
      category:"",
      difficulty:"",
      type:""
    }))*/
  };
  console.log(questionTypeData)
  
  return (
    <div className="App">
      <img className="shape-top" src={shapeTop} alt="Shape Top" />
      {/*<div className='app-heading'>
        <h2>Quizzical</h2>
        <h3> Answer the questions and test your knowledge!</h3>
  </div>*/}
      
      
      <main>
        
        {start
          ?<section className="game-intro">
          <h1 className="game-title">Quizzical</h1>
          <p className="game-text">Answer the questions and test your knowledge!</p>

          <div className="gameOptions-container">
            <div className="select-container">
              <label className="custom-label" htmlFor="category">Category:</label>

              <select
                name="category"
                id="category"
                className="custom-select"
                value={questionTypeData.category}
                onChange={handleChange}
              >
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                <option value="32">Entertainment: Cartoon &amp; Animations</option>
              </select>
            </div>
            
            <div className="select-container">
              <label className="custom-label" htmlFor="difficulty">Difficulty:</label>

              <select
                name="difficulty"
                id="difficulty"
                className="custom-select"
                value={questionTypeData.difficulty}
                onChange={handleChange}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div className="select-container">
              <label className="custom-label" htmlFor="type">Type of questions:</label>

              <select
                name="type"
                id="type"
                className="custom-select"
                value={questionTypeData.type}
                onChange={handleChange}
              >
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </div>
          </div>

          <button className="btn-primary-start" onClick={handleGameStart}>Start Quiz</button>
        </section>

          : 
            /*{quesElements}*/
            
            <Question
              start={start}
              restart={restart}
              ques={ques}
              isAsnwerChecked={isAsnwerChecked}
              correctAnswewrcount={correctAnswewrcount}
              restartQuiz={restartQuiz}
              checkAnswer={checkAnswer}
              setRestart={setRestart}
              setUrl={setUrl}
              setQues={setQues}
            />
            
            }
        
      </main>
      <img className="shape-bottom" src={shapeBottom} alt="Shape Bottom" />
    </div>
  );
}

export default App;
