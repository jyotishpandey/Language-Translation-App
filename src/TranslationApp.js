import React, { useState, useEffect } from 'react';
import { detectLanguage, translateText, fetchLanguages } from './api';
import './TranslationApp.css'


const TranslationApp = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState(null);


    

    // Fetch supported languages on component mount
    useEffect(() => {
        const fetchLanguagesList = async () => {
            try {
                const languageList = await fetchLanguages();
                setLanguages(languageList);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguagesList();
    }, []);

    const handleInputChange = async (event) => {
        const text = event.target.value;
        setInputText(text);
        try {
            const language = await detectLanguage(text);
            setDetectedLanguage(language);
        } catch (error) {
            console.error('Error detecting language:', error);
            setError(error.message);
        }
    };

    const handleTranslate = async () => {
        try {
            const translated = await translateText(inputText, targetLanguage, detectedLanguage);
            setTranslatedText(translated);
        } catch (error) {
            console.error('Error translating text:', error);
            setError(error.message);
        }
    };

    return (
        <div className='translation-container'>
            <h1>Translation App</h1>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text"
            />
            <div>
                <h2>Detected Language:</h2>
                <p>{detectedLanguage || 'No language detected yet'}</p>
            </div>
            <div>
                <h2>Target Language:</h2>
                <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                    {languages.map((lang) => (
                        <option  key={lang.language} value={lang.language}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleTranslate}>Translate</button>
            <div>
                <h2>Translated Text:</h2>
                <p>{translatedText}</p>
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default TranslationApp;
