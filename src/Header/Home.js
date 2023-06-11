import React, { useState, useEffect } from 'react';

const TypingGame = () => {
    const [paragraph, setParagraph] = useState('');
    const [inputValue, setInputValue] = useState('');

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
    const handleRestartClick = () => {
        setInputValue('');
    };
    const handleButtonClick = () => {
        // Call the onChange functions
        handleRestartClick();
        generateParagraph();}


    return (
        <>

            <h1 style={{color:'white',textAlign:'center',marginTop:'20px'}}>Typing Speed Game</h1>

        <div className="container" >

            <div className="background-text">
                {/*// style={{ backgroundColor: highlightColor }*/}

                <p
                    id="pg"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                ></p>
                <input className={"textinput"} type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
              <div className="containerin">
                <br />
               <div  className="result">
                     <div className={"time"}>
                         <p className={"text1"}> Time</p>
                         <p className={"text2"}> 120 s </p>
                     </div>


                   <div className={"wpm"}>
                       <p className={"text1"}> WPM </p>
                       <p className={"text2"}> 0 </p>
                   </div>

                   <div className={"mistake"}>
                      <p className={"text1"}> Mistake</p>
                       <p className={"text2"}> 0</p>
                   </div>


                   <div className={"cpm"}>
                       <p className={"text1"}> CPM </p>
                       <p className={"text2"}> 0 </p>
                   </div>
               </div>

                <button onClick={handleButtonClick} >Start</button>
              </div>
            </div>
        </div>
       </>
    );
};

export default TypingGame;
