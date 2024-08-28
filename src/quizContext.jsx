import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    const addResult = (newResult) => {
    setResults((prevResults) => [...prevResults, newResult]);
    };

    return (
    <QuizContext.Provider value={{ results, addResult }}>
        {children}
    </QuizContext.Provider>
    );
};