import React from 'react';

const QuestionScreen = ({ question, options }) => {
    return (
        <div className="question-screen">
            <h1>{question}</h1>
            <div className="options">
                {options.map((option, index) => (
                    <button key={index} className="option-button">
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionScreen;