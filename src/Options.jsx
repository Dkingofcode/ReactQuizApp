import React from 'react';


export default function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;
  
  
    return (
    <div className='options'>
     {question.options.map((option, index) => (
        <button 
        className={`btn btn-option ${index === answer ? "answer" : ""} 
        ${  hasAnswered ?
            index === questions.correctOption ? 
            "correct" : "wrong" :
            ""
        }`} 
             key={option} 
             onClick={() => 
             dispatchEvent({ type: "newAnswer", payload: index })}>
            {option}
        </button>
     ))}      
    </div>
  )
}