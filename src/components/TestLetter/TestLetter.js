import React from 'react';
import './TestLetter.css';

const TestLetter = ({ individualLetterInfo }) => {
    // const { status } = individualLetterInfo;
    // let statusClass;

    // if (status === 'correct') {
    //     statusClass = 'test-letter-correct';
    // } else if (status === 'incorrect') {
    //     statusClass = 'test-letter-incorrect';
    // } else {
    //     statusClass = 'test-letter-not-attempted';
    // }
    //  New way to do the same
    const statusClassName = {
        correct: 'test-letter-correct',
        incorrect: 'test-letter-incorrect',
        notAttempted: 'test-letter-not-attempted',
    }[individualLetterInfo.status];

    return (
        <span className={`test-letter ${statusClassName}`}>
            {individualLetterInfo.testLetter}
        </span>
    );
};
export default TestLetter;
