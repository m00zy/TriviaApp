import HomeButton from '../components/homeButton';
import { useLocation } from 'react-router-dom';

export default function Results () {
    
    const location = useLocation();
    const score = location.state.score;

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div>
                <div className='flex flex-col justify-around h-44 items-center mb-64'>
                    <p className='block text-5xl font-inter'>Your final score is:</p>
                    <p className='block text-5xl font-inter'>{score}</p>
                </div>
                <div className='mx-auto w-fit'>
                    <HomeButton />
                </div>
            </div>
        </div>
    );
}