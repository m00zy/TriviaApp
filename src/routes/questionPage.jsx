import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/triviaService';

export default function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const location = useLocation();
    const settings = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchQuestions(
                    settings.numQuestions,
                    settings.category,
                    settings.difficulty
                );
                setQuestions(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
        </div>
    );
}