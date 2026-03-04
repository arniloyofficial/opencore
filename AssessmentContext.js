// AssessmentContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AssessmentContext = createContext();

const initialState = {
  currentQuestion: 0,
  answers: [],
  score: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload.answer],
        score: state.score + (action.payload.isCorrect ? 1 : 0),
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const AssessmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  return useContext(AssessmentContext);
};
