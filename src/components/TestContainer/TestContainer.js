import React from 'react';
import './TestContainer.css';
import TryAgain from '../TryAgain/TryAgain';
import TypingChallengeContainer from '../TypingChallengeContainer/TypingChallengeContainer';

const TestContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange,
    startAgain,
}) => {
    return (
        <div className="container">
            <div className="test-container">
                {timeRemaining > 0 ? (
                    <div  className="typing-challenge-cont">
                        <TypingChallengeContainer
                            timeRemaining={timeRemaining}
                            timerStarted={timerStarted}
                            selectedParagraph={selectedParagraph}
                            words={words}
                            characters={characters}
                            wpm={wpm}
                            testInfo={testInfo}
                            onInputChange={onInputChange}
                        />
                    </div>
                ) : (
                    <div className="try-again-cont">
                        <TryAgain
                            words={words}
                            characters={characters}
                            wpm={wpm}
                            startAgain={startAgain}
                        />
                    </div>
                )}

                {/* < */}
            </div>
        </div>
    );
};
export default TestContainer;
