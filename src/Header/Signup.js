import React, { useState, useEffect } from 'react';

const TypingGame = () => {
    const [paragraph, setParagraph] = useState('');
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        generateParagraph();
    }, []);

    const generateParagraph = () => {
        // Same code as before...
        const paragraphLength = Math.floor(Math.random() * 5) + 3; // Generate a paragraph with 3 to 7 sentences
        const sentences = [
            'The quick brown fox jumps over the lazy dog.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'A journey of a thousand miles begins with a single step.',
            'In the midst of chaos, there is also opportunity.',
            'Life is what happens when you\'re busy making other plans.',
            'Success is not final, failure is not fatal: It is the courage to continue that counts.',
            'Happiness is not something ready-made. It comes from your own actions.',
            'The only way to do great work is to love what you do.',
            'Believe you can and you\'re halfway there.',
            'Don\'t watch the clock; do what it does. Keep going.',
        ];

        let generatedParagraph = '';
        for (let i = 0; i < paragraphLength; i++) {
            const randomIndex = Math.floor(Math.random() * sentences.length);
            generatedParagraph += sentences[randomIndex] + ' ';
        }

        setParagraph(generatedParagraph.trim());
    }

    const handleTyping = (event) => {
        const { value } = event.target;
        setTypedText(value);
    };

    const highlightText = (text) => {
        const pattern = new RegExp(`(${typedText})`, 'gi');
        return text.replace(pattern, '<mark>$1</mark>');
    };

    return (
        <div>
            <h1>Typing Game</h1>
            <div className={"background-text"}>  <p id={"pg"} dangerouslySetInnerHTML={{ __html: highlightText(paragraph) }}></p> </div>
            {/*<p dangerouslySetInnerHTML={{ __html: highlightText(paragraph) }}></p>*/}
            <input type="text" value={typedText} onChange={handleTyping} />
        </div>
    );
};

export default TypingGame;
