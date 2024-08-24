import { useLocation, useNavigate } from 'react-router-dom';

export default function Results () {

    const location = useLocation();
    const state = location.state;
    const score = state.score;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
    
    return (
        <div>
            <p>Your final score is: {score}</p>
            <button onClick={handleClick}>Home</button>
        </div>
    );
}