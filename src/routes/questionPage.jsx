import { useLocation, useNavigate, Form } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { fetchQuestions, fetchToken } from '../services/triviaService';
import { QuizContext } from '../quizContext';
import './questionPage.css'

import he from 'he';

export default function QuestionPage() {
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const { addResult } = useContext(QuizContext);
    const location = useLocation();
    const settings = location.state;
    const navigate = useNavigate()
    const formRef = useRef(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    
    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const newToken = await fetchToken();
                fetchData(newToken);
            } catch (error) {
                console.error('Error fetching session token:', error);
            }
        };
    
        const fetchData = async (sessionToken) => {
            try {
                const data = await fetchQuestions(
                    settings.numQuestions,
                    settings.category,
                    settings.difficulty,
                    sessionToken,
                );

                const questionsWithShuffledAnswers = data.map(question => {
                    const allAnswers = [question.correct_answer, ...question.incorrect_answers];
                    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
                
                    return {
                        ...question,
                        shuffledAnswers, 
                    };
                });

                setQuestions(questionsWithShuffledAnswers);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
    
        fetchTokenData();
    }, []);

    if (!questions.length) {
        return <p>Loading...</p>;
    }

    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    const currQuestion = questions[questionIndex];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if(formData.get('answer') === currQuestion.correct_answer) {
            setScore(score => score + 1);
        }
        formRef.current.reset();
        
        if(questionIndex === questions.length - 1) {
            
            const result = {
                'score': score,
                'category': settings.category,
                'num-questions': settings.numQuestions,
                'difficulty': settings.difficulty,
            };
            addResult(result);

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
                </div>
                <div className='answers'>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        {currQuestion.shuffledAnswers.map((answer, index) => (
                            <div key={index}>
                                <input 
                                    type="radio" 
                                    id={`answer-${index}`} 
                                    value={answer} 
                                    name='answer'
                                    required
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