import React from 'react';

export default function ResultsHistory( {categories, results} ) {
    return (
        <div>
            <p className='w-auto text-center text-3xl p-5'>Previous Results</p>
            <div className='results-history'>
            <table className='w-full text-base text-left'>
                <thead className='uppercase text-sm bg-gray-100'>
                    <tr>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Number of Questions</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className='py-2'>{categories[parseInt(result['category']) - 9]}</td>
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