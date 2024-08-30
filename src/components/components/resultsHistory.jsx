import React, { useContext } from 'react';
import { QuizContext } from '../../quizContext';

export default function ResultsHistory(categories) {
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
                            <td>{categories.categories[parseInt(result['category']) - 9]}</td>
                            <td>{result['difficulty'][0].toUpperCase() + result['difficulty'].slice(1)}</td>
                            <td>{result['num-questions']}</td>
                            <td>{result['score']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}