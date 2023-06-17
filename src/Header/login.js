import React, { useState, useEffect } from 'react';

const TypingGame = () => {
    const [paragraph, setParagraph] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [wpm, setWpm] = useState(0);

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

        const generatedParagraph = () => {
            const randIndex = Math.floor(Math.random() * paragraph.length);
            const pg = document.getElementById('pg');
            const characters = paragraph[randIndex].split("");

            const spanElements = characters.map((char, index) => (
                <span key={index}>{char}</span>
            ));

            pg.innerHTML = '';
            spanElements.forEach((span) => {
                pg.appendChild(span);
            });

            pg.querySelectorAll('span')[0].classList.add('active');
        };

        setParagraph(generatedParagraph.trim());
    }
    // const handleRestartClick = () => {
    //     setInputValue('');
    // };
    // const handleButtonClick = () => {
    //     // Call the onChange functions
    //     handleRestartClick();
    //     generateParagraph();}




    const startTyping = (event) => {
        const userinput = event.target;
        const characters = document.getElementById('pg').querySelectorAll('span');
        const typedChar = userinput.value.split("")[charIndex];

        if (charIndex < characters.length - 1 && timeRemaining > 0) {
            if (!isTyping) {
                setIsTyping(true);
            }

            if (typedChar == null) {
                if (charIndex > 0) {
                    setCharIndex((prevIndex) => prevIndex - 1);
                    if (characters[charIndex].classList.contains("incorrect")) {
                        setMistakes((prevMistakes) => prevMistakes - 1);
                    }
                    characters[charIndex].classList.remove("incorrect", "correct");
                }
            } else {
                if (characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    characters[charIndex].classList.add("incorrect");
                    setMistakes((prevMistakes) => prevMistakes + 1);
                }
                setCharIndex((prevIndex) => prevIndex + 1);
            }

            characters.forEach((char) => {
                char.classList.remove("active");
            });
            characters[charIndex].classList.add("active");

            const currentWpm = Math.round(((charIndex - mistakes) / 5) / (120 - timeRemaining) * 60);
            setWpm(currentWpm < 0 || !currentWpm || currentWpm === Infinity ? 0 : currentWpm);
        } else {
            setIsTyping(false);
        }
    };

    const resetGame = () => {
        setParagraph();
        setTimeRemaining(120);
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
        setWpm(0);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining((prevTime) => prevTime - 1);
                const currentWpm = Math.round(((charIndex - mistakes) / 5) / (120 - timeRemaining) * 60);
                setWpm(currentWpm);
            } else {
                setIsTyping(false);
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeRemaining, charIndex, mistakes]);

    return (
        <>

            <h1 style={{color:'white',textAlign:'center',marginTop:'20px'}}>Typing Speed Game</h1>

            <div className="container">
                <input type="text" className="textinput" onChange={startTyping} />
                <div className="background-text">
                    <p id="pg"></p>
                    <div className="containerin">
                        <div className="result">
                            <div className="time">
                                <p className="txt1">Time</p>
                                <p className="txt2">{timeRemaining}</p>
                            </div>
                            <div className="wpm">
                                <p className="txt1">WPM</p>
                                <p className="txt2">{wpm}</p>
                            </div>
                            <div className="mistake">
                                <p className="txt1">Mistakes</p>
                                <p className="txt2">{mistakes}</p>
                            </div>
                            <div className="cpm">
                                <p className="txt1">CPM</p>
                                <p className="txt2">{charIndex - mistakes}</p>
                            </div>
                        </div>
                        <button onClick={resetGame}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TypingGame;
