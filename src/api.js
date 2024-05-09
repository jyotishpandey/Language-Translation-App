// api.js
import axios from 'axios';

// Define your API key (replace 'your-api-key' with the actual API key)
const apiKey = 'b5d83f87d1msh3958a7f054d22acp1d6c62jsn42b487ec06b9';

// Function to detect language
export async function detectLanguage(text) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', text);

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return response.data.data.detections[0][0].language;
    } catch (error) {
        console.error('Error detecting language:', error);
        throw error;
    }
}

// Function to translate text
export async function translateText(text, targetLanguage, sourceLanguage) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', text);
    encodedParams.set('target', targetLanguage);
    encodedParams.set('source', sourceLanguage);

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
}

// Function to fetch supported languages
export async function fetchLanguages() {
    const options = {
        method: 'GET',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.data.languages;
    } catch (error) {
        console.error('Error fetching languages:', error);
        throw error;
    }
}
