import React from 'react';
import './TypingChallengeContainer.css';
import ChallengeDetailsCard from '../ChallengeDetailsCard/ChallengeDetailsCard';
import TypingChallenge from '../TypingChallenge/TypingChallenge';
const TypingChallengeContainer = ({
    onInputChange,
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
}) => {
    return (
        <div className="typing-challenge-container">
            {/* //  Details Section */}
            <div className="details-container">
                {/* Words typed */}
                <ChallengeDetailsCard cardName={'Words'} cardValue={words} />
                {/* characters typed */}
                <ChallengeDetailsCard
                    cardName={'Characters'}
                    cardValue={characters}
                />
                {/* speed */}
                <ChallengeDetailsCard cardName={'Speed'} cardValue={wpm} />
            </div>
            {/* the real challenge */}
            <div className="typewriter-container">
                <TypingChallenge
                    onInputChange={onInputChange}
                    timeRemaining={timeRemaining}
                    timerStarted={timerStarted}
                    selectedParagraph={selectedParagraph}
                    testInfo={testInfo}
                />
            </div>
        </div>
    );
};
export default TypingChallengeContainer;
