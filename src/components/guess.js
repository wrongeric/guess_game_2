import React, {Component} from 'react';
import '../assets/css/game.css';
import History from './history';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            randomNumber: 0,
            userNumber: '',
            message: '',
            shake: false,
            status: 'playable',
            guesses: 0,
            lowScore: localStorage.getItem('score') || 'Not Set',
            history: [],

        }
    }

    checkHighScore(){
        const highScore = localStorage.getItem('score');
        const { guesses} = this.state;

        if(highScore){
            if(guesses < highScore){
                localStorage.setItem('score', guesses);
            }
            else {
                localStorage.setItem('score', guesses);
            }
            this.setState({
                lowScore: localStorage.getItem('score')
            });
        }
        localStorage.setItem('score', guesses);
    }

    componentDidMount(){
        this.generateRandomNumber();
    }

    generateRandomNumber(){
        const randNum = Math.floor(Math.random()* 10) + 1;

        this.setState({
            randomNumber: randNum,
            status: 'playable',
            userNumber: '',
            message: '',
            guesses: 0,
            history: [],
        });
    }
     makeGuess(event){
        event.preventDefault();
        if(this.state.status === 'won'){
            return;
        }

         const {userNumber, randomNumber, guesses, history} = this.state;
         let msg = '';
         let status = 'playable';
         let newGuesses = guesses;

         if(randomNumber < userNumber){
             msg = 'Too high!';

         }
         else if(randomNumber > userNumber){
             msg = 'Too low!';
         }
         else{
             msg = 'You WIN!';
             status = 'won';
         }

         this.setState({
             message: `You guessed number: ${userNumber} ` + msg,
             userNumber: '',
             shake: true,
             status: status,
             guesses: guesses + 1,
             history: [`${userNumber} is ${msg}`, ...history]
         }, function(){
             if(status ==='won'){
                 this.checkHighScore();
             }
         });

         setTimeout(() => {
             this.setState({
                 shake: false
             });
         }, 750);
     }
    resetGame(){
        this.generateRandomNumber();

    }
    render(){
        const btnStyle = {
            margin: '10px 5px',
        };

        const {randomNumber, userNumber, message, shake, guesses, lowScore, history } = this.state;
        // console.log('State:', this.state);
        return (
            <div>
                <p className="center-align">Random Number: {randomNumber}</p>
                <p className="center-align">Best Score: {lowScore}</p>
                <div className="row">
                    <form onSubmit={this.makeGuess.bind(this)}className="col s6 offset-s3">
                        <div className="row">
                            <div className="input-field">
                                <input className="center-align" onChange={(event) => { this.setState({userNumber: event.target.value})}} value= {userNumber} type="number" placeholder="Enter a number"/>
                            </div>
                            <div className="row center-align">
                                <button className="btn green darken-2" style={btnStyle}>Guess</button>
                                <button type="button" className="btn red darken-2" onClick={this.resetGame.bind(this)} style={btnStyle}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
                <h4 className="center-align">Number of Guesses: {guesses}</h4>
                <h3 className={`center-align ${shake ? 'shake' : ''}`}>{message}</h3>
                <History data={history} />
            </div>
        )
    }
}

export default Game;