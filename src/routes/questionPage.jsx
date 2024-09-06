import { useLocation, useNavigate, Form } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { fetchQuestions, fetchToken } from '../services/triviaService';
import { QuizContext } from '../quizContext';
import AnswerCard from '../components/answerCard';

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
                    <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span className="sr-only">Loading...</span>
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
        <div className='w-screen h-screen'>
            <div className='w-full text-right p-12 text-3xl font-inter text-gray-700'>
                <p>Question {questionIndex + 1} / {questions.length}</p>
            </div>
            <div className='w-full h-3/4 my-36 flex flex-col items-center'>
                <div className='text-center text-5xl w-2/3 h-1/3 font-inter text-gray-700 leading-snug'>
                    <p className='my-12'>{he.decode(currQuestion.question)}</p>
                </div>
                <Form onSubmit={handleSubmit} 
                ref={formRef}
                className='w-full h-2/3'>
                    <div className='mx-auto grid w-3/4 grid-rows-2 grid-cols-2 h-3/4 justify-items-center auto-cols-max gap-5'>
                    {currQuestion.shuffledAnswers.map((answer, index) => (
                        <AnswerCard 
                        answer={toTitleCase(he.decode(answer))} 
                        index={index} 
                        key={index}
                        className={`row-start-${index < 2 ? 1 : 2} col-start-${index % 2 === 0 ? 1 : 0}`}/>
                    ))}
                    </div>
                    <input type='submit' value='Next' 
                    className='mt-14 px-8 py-4 block mx-auto text-3xl font-inter tracking-wide cursor-pointer 
                    bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:text-white 
                    hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105'>
                    </input>
                </Form>
            </div>
        </div>
    );
}