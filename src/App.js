import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import './style.css'

const App = () => {
    const [start, setStart] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [checkedAnswers, setCheckedAnswers] = useState([]);
    const [check, setCheck] = useState(false);
    const [correctAnswersLength, setCorrectAnswersLength] = useState(0);
    const [restart, setRestart] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => setQuestions(data.results))
    }, [])

    useEffect(() => {
        if(restart) {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        }
        
    }, [restart])

    const startQuiz = () => {
        setStart(true)
    }

    const addAnswers = (correctAnswer, answer, id) => {
        if(checkedAnswers.find(answer => answer.id === id)) {
            setCheckedAnswers(prevCheckedAnswers => prevCheckedAnswers.map(obj => {
                return obj.id === id ? 
                    {...obj, answer} :
                    obj
            }))
        } else {
            setCheckedAnswers(prevCheckedAnswer => {
                return [...prevCheckedAnswer, {id, correctAnswer, answer}]
            });
        }
    }

    const checkAnswers = () => {
        checkedAnswers.forEach(element => {
            if(element.correctAnswer === element.answer) {
                setCorrectAnswersLength(prevCorrectAnswersLength => prevCorrectAnswersLength + 1);
            }
        })
        setCheck(true);
    }

    const restartQuiz = () => {
        setRestart(true);
        setCheck(false);
        setCheckedAnswers([]);
        setCorrectAnswersLength(false)
    }

    return (
        <main>
            {
                start ? 
                questions.map((question, index) => {
                    return <Quiz 
                        key={index} 
                        title={question.question} 
                        correct={question.correct_answer} 
                        incorrect={question.incorrect_answers} 
                        addAnswers={addAnswers} 
                        id={index}
                        check={check}
                        /> 
                })
                : 
                <Home handleClick={startQuiz} />
            }
            {
                start && !check &&
                (
                    <div className="score-container">
                        <button className="check-button" onClick={checkAnswers}>Check answers</button>
                    </div>
                )
            }
             {
                start && check &&
                (
                <div className="score-container">
                    <span className="score-text">You scored {correctAnswersLength}/{questions.length} correct answers</span>
                    <button className="check-button" onClick={restartQuiz}>Play Again</button>
                </div>
                )
            }
        </main>
    )
}

export default App;