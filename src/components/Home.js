import React from "react";

const Home = (props) => {
    return (
        <div className="home">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="start-button" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}

export default Home;