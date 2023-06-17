import React, { useState, useEffect } from 'react';

const paragraphs = [
    "The sun is a star located at the center of our solar system. It is the largest and most massive object in the solar system, accounting for about 99.86% of the total mass. The sun provides light and heat to the Earth, and its gravitational pull helps to keep the planets in their orbits.",
    "The Earth is the third planet from the sun and the fifth largest planet in the solar system. It has one natural satellite, the moon, which is the largest relative to its host planet in the solar system. Earth is the only known planet to have liquid water on its surface, and is home to a diverse range of life forms.",
    "The moon is the Earth's only natural satellite. It was formed about 4.5 billion years ago, shortly after the formation of the solar system. The moon has a significant effect on the Earth, as its gravitational pull causes tides and affects the rotation of the planet. It is also the location of the first human landing in 1969 by astronauts of the Apollo 11 mission.",
    "Mars is the fourth planet from the sun and is commonly referred to as the Red Planet. It is the second closest planet to Earth, and is often studied by scientists for the possibility of supporting life. Mars has a thin atmosphere, and its surface is covered with a layer of iron oxide, giving it a reddish appearance.",
    "Jupiter is the fifth planet from the sun and is the largest planet in the solar system. It is a gas giant, meaning that it is primarily composed of hydrogen and helium. Jupiter has a strong magnetic field and a large number of moons, including the four largest, known as the Galilean moons."
];

const TypingSpeedGame = () => {
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [wpm, setWpm] = useState(0);

    useEffect(() => {
        setParagraph();
    }, []);

    const setParagraph = () => {
        const randIndex = Math.floor(Math.random() * paragraphs.length);
        const characters = paragraphs[randIndex].split("");
        setCharIndex(0);
        setMistakes(0);
        setWpm(0);
        setTimeRemaining(120);
        setIsTyping(false);
    };

    const startTyping = (event) => {
        const typedChar = event.target.value.split("")[charIndex];
        const characters = Array.from(document.querySelectorAll('#pg span'));

        if (charIndex < characters.length - 1 && timeRemaining > 0) {
            if (!isTyping) {
                setIsTyping(true);
            }

            if (typedChar === undefined) {
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

            let calculatedWpm = Math.round(((charIndex - mistakes) / 5) / (120 - timeRemaining) * 60);
            calculatedWpm = calculatedWpm < 0 || !calculatedWpm || calculatedWpm === Infinity ? 0 : calculatedWpm;
            setWpm(calculatedWpm);
        } else {
            setIsTyping(false);
        }
    };

    const startTimer = () => {
        if (timeRemaining > 0) {
            setTimeRemaining((prevTime) => prevTime - 1);
            let calculatedWpm = Math.round(((charIndex - mistakes) / 5) / (120 - timeRemaining) * 60);
            setWpm(calculatedWpm);
        } else {
            setIsTyping(false);
        }
    };
    useEffect(() => {
        if(!timeRemaining){
            return " Game Over "
        }
        const intervalId = setInterval(() => {
            setTimeRemaining(timeRemaining -1 );
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeRemaining]);

    const resetGame = () => {
        setParagraph();
    };

    return (
        <>
            <h1 style={{color:'white',textAlign:'center',marginTop:'20px'}}>Typing Speed Game</h1>
            <div className="container">

                <div className="background-text">
                    <p id="pg">
                        {paragraphs.map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {paragraph.split("").map((char, charIndex) => (
                                    <span key={charIndex}>{char}</span>
                                ))}
                            </React.Fragment>
                        ))}
                    </p>
                    <input type="text" className="textinput" onChange={startTyping} />


                    <div className="containerin">
                        <div className="result">
                            <div className="time">
                                <p className="text1">Time</p>
                                <p className="text2">{timeRemaining}</p>
                            </div>

                            <div className="wpm">
                                <p className="text1">WPM</p>
                                <p className="text2">{wpm}</p>
                            </div>

                            <div className="mistake">
                                <p className="text1">Mistakes</p>
                                <p className="text2">{mistakes}</p>
                            </div>

                            <div className="cpm">
                                <p className="text1">CPM</p>
                                <p className="text2">{charIndex - mistakes}</p>
                            </div>
                        </div>
                        <button onClick={resetGame}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TypingSpeedGame;
