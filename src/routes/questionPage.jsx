import { useLocation, useNavigate, Form } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { fetchQuestions, fetchToken } from '../services/triviaService';
import { QuizContext } from '../quizContext';

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

    
    function toTitleCase(str) {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

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

        return (
                <div className='w-screen h-screen flex items-center justify-center' role="status">
                    <svg aria-hidden="true" class="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span class="sr-only">Loading...</span>
                </div>
        );
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
                                <label htmlFor={`answer-${index}`}>{toTitleCase(he.decode(answer))}</label>
                            </div>
                        ))}
                        <input type='submit' value='Next'></input>
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