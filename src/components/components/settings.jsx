import '../styling/settings.css';
import { Form } from "react-router-dom";

export default function Settings( {categories} ) {
    
    const diffs = ['Easy', 'Medium', 'Hard'];

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
