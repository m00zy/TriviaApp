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

export async function fetchToken() {
    const url = BASE_URL + '/api_token.php?command=request';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data.token;
        
    }
    catch (error) {
        console.error('Error fetching session token:', error);
        return null;
    }
}

export async function fetchQuestions(numQuestions, category, difficulty, sessionToken) {
    const url = BASE_URL + `/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple&token=${sessionToken}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data.results;
        
    }
    catch (error) {
        console.error('Error fetching trivia questions:', error);
        return null;
    }
}