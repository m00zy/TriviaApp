import { useNavigate } from 'react-router-dom';

export default function HomeButton() {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div>
            <button 
            onClick={handleClick}
            className='text-3xl font-inter p-4 cursor-pointer border border-gray-300 
            bg-blue-600 text-white rounded-lg shadow-md 
            hover:bg-blue-700 hover:text-white hover:shadow-lg 
            transition-all duration-200 ease-in-out transform hover:scale-105'>Home</button>
        </div>
    )
};