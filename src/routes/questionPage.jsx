import { useLocation, useNavigate, Form } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { fetchQuestions } from '../services/triviaService';

import he from 'he';

export default function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const location = useLocation();
    const settings = location.state;
    const navigate = useNavigate()
    const formRef = useRef(null);

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

    if (!questions.length) {
        return <p>Loading</p>;
    }

    const currQuestion = questions[questionIndex];
    const allAnswers = [currQuestion.correct_answer, ... currQuestion.incorrect_answers].sort(() => Math.random() - 0.5);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        formRef.current.reset();
        const formData = new FormData(e.target);
        if(formData.get('answer') === currQuestion.correct_answer) {
            setScore(score => score + 1);
        }
        
        if(questionIndex === questions.length - 1) {
            navigate('/results', {state: {
                score: score
            }});
        }
        else{
            setQuestionIndex(questionIndex => questionIndex + 1);
        }
    }
    
    return (
        <div className='question-page'>
            <div className='question-header-container'>
                <div className='question-header'>
                    <p>Question {questionIndex + 1} / {questions.length}</p>
                </div>
            </div>
            <div className='question-container'>
                <div className='question'>
                    <p>{he.decode(currQuestion.question)}</p>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        {allAnswers.map((answer, index) => (
                            <div key={index}>
                                <input 
                                    type="radio" 
                                    id={`answer-${index}`} 
                                    value={answer} 
                                    name='answer'
                                />
                                <label htmlFor={`answer-${index}`}>{he.decode(answer)}</label>
                            </div>
                        ))}
                        <input type='submit' value='Submit'></input>
                    </Form>
                </div>
            </div>
            <div className='score-container'>
                {questionIndex > 0 ? (
                    <div className='score'>
                        <p>Score: {score} / {questionIndex}</p>
                    </div>
                ) : null}
            </div>

        </div>
    );
}