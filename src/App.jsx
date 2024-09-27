import {  useReducer, useEffect } from 'react';
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import Header from "./Header";
import Question from './Question';
import Error from './Error';
import StartScreen from './StartScreen';
import './App.css';
import Loader from './Loader';
import NextButton from './NextButton';
import FinishScreen from './FinishScreen';
import Progress from './Progress';
import Timer from './Timer';

// function reducer(state, action) {
//   console.log(state, action);
//   // if (action.type === "inc") return state + 1;
//   // if (action.type === "dec") return state - 1;
//   // if (action.type === "setCount") return action.payload;

//    switch (action.type) {
//     case "dec":
//       return { ...state, count: state.count - state.step };
//     case "inc":
//       return { ...state, count: state.count + state.step };
//     case "setCount":
//       return { ...state, count: action.payload };    
//     case "setStep":
//       return { ...state, step: action.payload };
//     case "reset":
//       return initialState;
//       default:
//       throw new Error("Unknown action");     
//   }
// }

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
   points: 0,
   index: 0,
   answer: null,
   highscore: 0,
   secondsRemaining: 10,
  status: "loading",
}

function reducer(state, action) {
  switch(action.type) {
    case "dataRecieved":  
    return { 
       ...state,
       questions: action.payload,
       status: "ready",
    };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
      case "start":
        return {
          ...state, status: "active",
        };
      case "newAnswer":
          { const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption ? 
          state.points + question.points : state.points,
        }; }

        case "nextQuestion":
          return { ...state, index: state.index + 1, answer: null };

        case "finish":
            return { ...state, 
              status: "finished",
              highscore: state.points > state.highscore 
              ? state.points : state.highscore}  
     
        case "restart":
          return { ...initialState, 
            questions: state.questions, 
            status: "ready" 
          };   

        case "tick":
          return { 
            ...state,
            secondsRemaining: state.secondsRemaining - 1,
            status: state.secondsRemaining === 0 ? "finished" : state.status,
          }; 
     
      default:  
         throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur)

  useEffect(() => {
    fetch("http://localhost:9000/questions").then(
      (res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);


  return (
    <>
      <div className='app'>
        <Header  />

      <main className='main'>
          {/* <p>1/15</p>
          <p>Question?</p>  */}
        {status === "loading" && <Loader  />}
        {status === "error" && <Error  />}
        {status === "ready" && <StartScreen 
        numQuestions={numQuestions} dispatch={dispatch} 
        />
        }

        {status === "active" &&  ( 
        <>
         <Progress  
            index={index}
            numQuestions={numQuestions}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
         />

        <Question 
           question={questions[index]}
           dispatch={dispatch}
           answer={answer}
        />
       
       <Footer>
        <Timer 
          dispatch={dispatch}
        />

        <NextButton  
          dispatch={dispatch}
          answer={answer}
          numQuestions={numQuestions}
          index={index}
          />
          </Footer>
        </>

      )}
      {status === "finished" && (
        <FinishScreen 
           points={points}
           maxPossiblePoints={maxPossiblePoints}
           highscore={highscore}
           dispatch={dispatch}
         />
      )}
        </main>
     </div>     
    </>
  )
};

export default App;
