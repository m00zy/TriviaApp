import HomeButton from '../components/homeButton';
import { useLocation } from 'react-router-dom';

export default function Results () {
    
    const location = useLocation();
    const score = location.state.score;

    return (
        <div className='results-container'>
            <p>Your final score is: {score}</p>
            <HomeButton />
        </div>
    );
}