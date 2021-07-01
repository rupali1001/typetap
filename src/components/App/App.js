import React from 'react';
import './App.css';
import Nav from './../Nav/Nav';
import Landing from './../Landing/Landing';
import Footer from './../Footer/Footer';
import ChallengeSection from '../ChallengeSection/ChallengeSection';

const TotalTime = 60;
const ServiceUrl = 'http://metaphorpsum.com/paragraphs/1/9';
const defaultState = {
    selectedParagraph: '',
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: [],
};

class App extends React.Component {
    state = defaultState;

    fetchNewParagraph = () => {

        console.log("exec")

        fetch(ServiceUrl)
            .then((response) => response.text())
            .then((data) => {
                this.setState({ selectedParagraph: data });


                const selectedParagraphArray = data.split('');
                const testInfo = selectedParagraphArray.map(
                    (selectedLetter) => {
                        return {
                            testLetter: selectedLetter,
                            status: 'notAttempted',
                        };
                    }
                );
                this.setState({
                    ...defaultState,
                    testInfo,
                    selectedParagraph: data,
                });
            });
        //when key and value are same we can just write one
    };

    componentDidMount() {
        this.fetchNewParagraph();
    }
    //    setInterval runs same code after regular intervals
    startTimer = () => {
        this.setState({ timerStarted: true });
        const timer = setInterval(() => {
            if (this.state.timeRemaining > 0) {
                //changing wpm
                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm =
                    timeSpent > 0 //if 0 then in denominatir would be infinity
                        ? (this.state.words / timeSpent) * TotalTime
                        : 0;
                this.setState({
                    timeRemaining: this.state.timeRemaining - 1,
                    wpm: parseInt(wpm), //as we want value in int
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);
    };

    startAgain = () => this.fetchNewParagraph();

    handleUserInput = (inputValue) => {
        if (!this.state.timerStarted) this.startTimer();
        /*
        Algorithm
        1.Handle underflow case(means I havent typed anything)-all the characters should be shown as not attempted
           early exit
        2.Handle the overflow case(You finish test before the time given)-early exit
        3.Handle the backspace case(here we are not handling the case when the content is selected and removed all at once.)-
         Mark [index+1] element as not-Attempted(irrespective to whether the index is leass than zero)
         Don't forgrt to check the overflow case here.
         ([index+1]->is out of bound,when the index ===length-1)
        4.Update the status in the test info
           - Find out the last character in the inputValue and its index
           -Check if the character at same index in testInfo(state) matches
           -yes->"correct"
            No->'incorrect'
        5.Irrespective of the case,characters,words and speed(wpm) can be updated

        */

        const characters = inputValue.length;
        const words = inputValue.split(' ').length; //whenever you find space split it
        const index = characters - 1;
        //underflow case
        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: 'notAttempted',
                    },
                    ...this.state.testInfo.slice(1), //rest and spread
                ],
                characters,
                words,
            });
            return;
        }
        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;
        }
        //Make a copy of testInfo
        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = 'notAttempted';

        //check for the correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter;

        //Update the testInfo
        testInfo[index].status = isCorrect ? 'correct' : 'incorrect';

        //Update the state
        this.setState({
            testInfo,
            words,
            characters,
        });
    };

    render() {
        return (
            <div className="app">
                {/*Nav section*/}
                <Nav />
                {/*Landing Page*/}
                <Landing />
                {/*Challenge section*/}
                <ChallengeSection
                    selectedParagraph={this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.characters}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    testInfo={this.state.testInfo}
                    onInputChange={this.handleUserInput}
                    wpm={this.state.wpm}
                    startAgain={this.startAgain}
                />
                <button onClick={()=> this.startAgain()}>zzz</button>
                {/*Footer*/}
                <Footer />
            </div>
        );
    }
}

export default App;
