import Welcome from '../components/welcome';
import Settings from '../components/settings';
import ResultsHistory from '../components/resultsHistory';
import { fetchCategories } from '../services/triviaService';
import { useLoaderData } from 'react-router-dom'; 
import { useContext } from 'react'
import { QuizContext } from '../quizContext';

export async function loader() {
    const categories = await fetchCategories();
    return {categories};
}

export default function Home () {
    const { results } = useContext(QuizContext);
    const { categories } = useLoaderData();
    return (
        <div className='w-screen h-screen'>
            <div className='w-2/3 mx-auto'>
                <div className='pt-36 flex flex-col'>
                    <div className='w-1/2 mx-auto'>
                        <Welcome />
                        <Settings categories={categories}/>
                    </div>
                    <div className='w-3/4 mx-auto'>
                    {console.log(results)}
                        {results.length > 0 ? <ResultsHistory categories={categories} results={results}/> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
