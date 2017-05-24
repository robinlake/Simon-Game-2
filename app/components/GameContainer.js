var React = require('react');




export class GameContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                        moves: [],
                        targetMoves: [],
                        game: 'off'
                        };
        this.incrementMoves = this.incrementMoves.bind(this);
        this.resetMoves = this.resetMoves.bind(this);
        this.startGame = this.startGame.bind(this);
    }
    incrementMoves(input){
        this.setState(function(){
            return{
                moves: this.state.moves + input
            }
        });
    }
    resetMoves(){
        this.setState(function(){
            return{
                moves: [],
                game: 'off'
            }
        });
    }
    startGame(){
        if(this.state.game == 'off'){
            this.setState(function(){
                return {
                    game: 'on'

                }
            });
        }
    }
    render(){
        return(
            <div className="gameContainer">
                moves:{this.state.moves} game: {this.state.game}
                <button className="button1" onClick={() =>{this.incrementMoves(1)}}>Click Me</button>
                <button className="button2" onClick={() =>{this.incrementMoves(2)}}>Click Me</button>
                <button className="button3" onClick={() =>{this.incrementMoves(3)}}>Click Me</button>
                <button className="button4" onClick={() =>{this.incrementMoves(4)}}>Click Me</button>
                <button className="restartButton" onClick={this.resetMoves}>Restart</button>
                <button className="strictButton" onClick={this.resetMoves}>Strict</button>
                <button className="startButton" onClick={this.startGame}>Start</button>
            </div>
        )
    }
}

class Button extends React.Component {
    render(){
        return(
            <button className={this.props.className}></button>
        )
    }
}

module.exports = GameContainer;