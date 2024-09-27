import React from 'react';

export default function NextButton({ answer, dispatch }) {
  if (!answer)  return null;

  if (answer) return (
    <div>
        <button onClick={() => 
            dispatch({  type: "nextQuestion" })}>
                Next
            </button>

    </div>
  );

  if(index === numQuestions - 1){
    return (
        <button className='btn btn-ui' 
        onClick={() => dispatch({ type: "finish" })}>
            Finish
        </button>
    )
  }
};
