import React, {Component} from 'react';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            randomNumber: 0,
            userNumber: '',
        }
    }

    componentDidMount(){
        this.generateRandomNumber();
    }

    generateRandomNumber(){
        const randNum = Math.floor(Math.random()* 10) + 1;

        this.setState({
            randomNumber: randNum,
        });
    }
     makeGuess(event){
        event.preventDefault();

        console.log('User Number', this.state.userNumber);
     }
    resetGame(){
        this.generateRandomNumber();

    }
    render(){
        const btnStyle = {
            margin: '10px 5px',
        };

        const {randomNumber, userNumber } = this.state
        console.log('State:', this.state);
        return (
            <div>
                <p className="center-align">Random Number: {randomNumber}</p>
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



            </div>
        )
    }
}

export default Game;