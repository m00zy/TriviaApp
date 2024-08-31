import Welcome from '../components/components/welcome';
import Settings from '../components/components/settings';
import ResultsHistory from '../components/components/resultsHistory';
import './index.css';
import { fetchCategories } from '../services/triviaService';
import { useLoaderData } from 'react-router-dom'; 



export async function loader() {
    const categories = await fetchCategories();
    return {categories};
}

export default function Home () {
    const { categories } = useLoaderData();
    return (
        <div className='home-container'>
            <div className='home'>
                <div className='left-container'>
                    <Welcome />
                    <Settings categories={categories}/>
                </div>
                <div className='right-container'>
                    <ResultsHistory categories={categories}/>
                </div>
            </div>
        </div>
    );
}
