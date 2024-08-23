import Welcome from '../components/components/welcome';
import Settings from '../components/components/settings';
// import StartButton from '../components/components/startButton';
import { fetchCategories } from '../services/triviaService';
import { useLoaderData } from 'react-router-dom'; 


export async function loader() {
    const categories = await fetchCategories();
    return {categories};
}

export default function Home () {
    const { categories } = useLoaderData();
    return (
        <div>
            <Welcome />
            <Settings categories={categories}/>
        </div>
    );
}
