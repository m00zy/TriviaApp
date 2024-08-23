const BASE_URL = 'https://opentdb.com';

export async function fetchCategories() {
    const url = BASE_URL + '/api_category.php';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data.trivia_categories.map(item => item.name);
        
    }
    catch (error) {
        console.error('Error fetching trivia categories:', error);
        return null;
    }
}

export async function fetchQuestions(numQuestions, category, difficulty) {
    const url = BASE_URL + `/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data.results;
        
    }
    catch (error) {
        console.error('Error fetching trivia categories:', error);
        return null;
    }
}