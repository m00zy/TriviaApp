import '../styling/settings.css';
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/triviaService'; 
import { Form } from "react-router-dom";

export default function Settings() {
    
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState([]);

    const diffs = ['Easy', 'Medium', 'Hard'];

    useEffect(() => {
        const loadCategories = async () => {
            const triviaCategories = await fetchCategories();
            if (triviaCategories) {
                setCategories(triviaCategories);
            }
            else {
                setError('Failed to load categories');
            }
        };
        loadCategories();
    }, []);

    return (
        <div className='settings-container'>
            <div className='settings'>
                <Form method='post'>
                    <div className='setting'>
                        <label htmlFor='num-questions'>Number of Questions:</label>
                        <input type='text' name='num-questions' />
                    </div>
                    <div className='setting'>
                        <label htmlFor='category'>Category:</label>
                        <select name='category'>
                        {categories.map((category) => {
                                return <option key={category} value={category}>{category}</option>
                            })}
                        </select>
                    </div>
                    <div className='setting'>
                    <label htmlFor='difficulty'>Quiz Difficulty:</label>
                        <select name='difficulty'>
                            {diffs.map((diff) => {
                                return <option key={diff} value={diff}>{diff}</option>
                            })}
                        </select>
                    </div>
                </Form>
            </div>
        </div>
    );
}
