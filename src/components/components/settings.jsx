import '../styling/settings.css';
import { Form, useNavigate } from "react-router-dom";

export default function Settings( {categories} ) {
    
    const diffs = ['Easy', 'Medium', 'Hard'];
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        navigate('/quiz', {
            state: {
                numQuestions: formData.get('num-questions'),
                category: formData.get('category'),
                difficulty: formData.get('difficulty'),
            },
        });
    };


    return (
        <div className='settings-container'>
            <div className='settings'>
                <Form onSubmit={handleSubmit}>
                    <div className='setting'>
                        <label htmlFor='num-questions'>Number of Questions:</label>
                        <input type='text' name='num-questions' />
                    </div>
                    <div className='setting'>
                        <label htmlFor='category'>Category:</label>
                        <select name='category'>
                        {categories.map((category, index) => {
                                return <option key={category} value={index+9}>{category}</option> /* The category number is index + 9 */
                            })}
                        </select>
                    </div>
                    <div className='setting'>
                    <label htmlFor='difficulty'>Quiz Difficulty:</label>
                        <select name='difficulty'>
                            {diffs.map((diff) => {
                                return <option key={diff} value={diff.toLowerCase()}>{diff}</option>
                            })}
                        </select>
                    </div>
                    <div className='submit'>
                            <button type='submit'>Start Quiz</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
