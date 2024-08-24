import React, { useContext } from 'react';
import { QuizContext } from '../../QuizContext';

export default function ResultsHistory() {
    const { results } = useContext(QuizContext);

    return (
        <p>{results.map(result => result.score)}</p>
    );
}