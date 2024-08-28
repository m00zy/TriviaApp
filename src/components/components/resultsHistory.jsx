import React, { useContext } from 'react';
import { QuizContext } from '../../QuizContext';

export default function ResultsHistory() {
    const { results } = useContext(QuizContext);

    return (
        <div className='results-history-container'>
            <p>Previous Results</p>
            <div className='results-history'>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Number of Questions</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.category}</td>
                            <td>{result.difficulty}</td>
                            <td>{result.num_questions}</td>
                            <td>{result.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}