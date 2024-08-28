import HomeButton from '../components/components/homeButton';
import { useLocation } from 'react-router-dom';

export default function Results () {
    
    const location = useLocation();
    const score = location.state.score;

    return (
        <div>
            <p>Your final score is: {score}.</p>
            <HomeButton />
        </div>
    );
}