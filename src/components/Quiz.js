import React, { useEffect, useState } from "react";

const Quiz = (props) => {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [answer, setAnswer] = useState('')

    const correctAnswer = (question) => {
        if(props.check && (props.correct === question)) {
            return 'correct';
        } else if(props.check && props.correct !== question) {
            return 'incorrect';
        } else {
            return '';
        }
    }

    const shuffle = () => {
        let array = [...props.incorrect];
        array.push(props.correct)
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        setShuffledQuestions(array)

    }

    const handleClick = (question) => {
        props.addAnswers(props.correct, question, props.id);
        setAnswer(question);
    }

    useEffect(() => {
        shuffle();
    }, [props.incorrect]);

    return (
        <div className="quiz">
            <p className="quiz-title">{props.title}</p>
            <div className="quiz-tiles">
                {
                    shuffledQuestions.map((question, index) =>  (
                        <span 
                            onClick={() => handleClick(question)} key={index} className={`tile ${answer === question ? 'active' : ''} ${correctAnswer(question)}`}>
                            {question}
                        </span>
                    ))
                }
            </div>
            <hr />
        </div>
    )
}

export default Quiz;