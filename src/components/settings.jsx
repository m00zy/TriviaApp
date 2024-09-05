
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
        <div className='my-10'>
            <div className='flex flex-col'>
                <Form class='max-w-sm mx-auto' onSubmit={handleSubmit}>
                    <div className='pt-4'>
                        <label htmlFor='num-questions' className='block py-2 text-xl'>Number of Questions:</label>
                        <input name='num-questions' type='number' min='5' max='50' defaultValue='5' className='w-full h-9 text-lg px-2.5 py-5 border border-gray-300 rounded-lg required'></input>
                        <p className='text-gray-600 text-sm opacity-50'>Choose from 5 up to 50 questions</p>
                    </div>
                    <div className="relative inline-block w-full py-4">
                        <label htmlFor="category" className="block py-2 text-xl">Category:</label>
                        <select
                            name="category"
                            className="w-full h-12 appearance-none border border-gray-300 rounded-lg p-2.5 pr-10" // Add pr-10 to make space for the arrow
                        >
                            {categories.map((category, index) => {
                            return <option key={category} value={index + 9}>{category}</option>; /* The category number is index + 9 */
                            })}
                        </select>

                        <div className="pointer-events-none absolute right-0 top-[65%] transform -translate-y-1/4 pr-3">
                            <svg
                            className="fill-current h-4 w-4 text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            >
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                            </svg>
                        </div>
                    </div>

                    <div className="relative inline-block w-full py-4">
                        <label htmlFor='difficulty' className='block py-2 text-xl'>Quiz Difficulty:</label>
                            <select name='difficulty' 
                            className="w-full h-12 appearance-none border border-gray-300 rounded-lg p-2.5 pr-10">
                                {diffs.map((diff) => {
                                    return <option key={diff} value={diff.toLowerCase()}>{diff}</option>
                                })}
                            </select>
                            <div className="pointer-events-none absolute right-0 top-[65%] transform -translate-y-1/4 pr-3">
                            <svg
                            className="fill-current h-4 w-4 text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            >
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                            </svg>
                        </div>
                    </div>

                    <div className='pt-8'>
                        <button type='submit' className='block w-1/2 p-2 bg-blue-500 text-white font-medium text-lg rounded-lg hover:bg-blue-700 mx-auto'>Start</button>
                    </div>
                </Form>
                
                
            </div>
        </div>
    );
};
