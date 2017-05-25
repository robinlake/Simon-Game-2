var React = require('react');




export class GameContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                        usedMoves: [],
                        targetMoves: [],
                        game: 'off'
                        };
        this.incrementTargetMoves = this.incrementTargetMoves.bind(this);
        this.resetMoves = this.resetMoves.bind(this);
        this.startGame = this.startGame.bind(this);
        this.incrementUsedMoves = this.incrementUsedMoves.bind(this);
        this.checkMoves = this.checkMoves.bind(this);
        this.toggleGameOnOff = this.toggleGameOnOff.bind(this);
    }

    resetMoves(){
        this.setState(function(){
            return{
                usedMoves: [],
                game: 'off',
                targetMoves: []
            }
        });
    }

    incrementUsedMoves(input){
        var newUsedMoves = this.state.usedMoves;
        newUsedMoves.push(input);
        console.log(newUsedMoves);
        this.setState(function(){
            return{
                usedMoves: newUsedMoves
            }
        });        
    }

    incrementTargetMoves(){
        var newMove = Math.floor(Math.random() * 4 + 1);
        var newTargetMoves = this.state.targetMoves;
        newTargetMoves.push(newMove);
        console.log(newTargetMoves);
        this.setState(function(){
            return{
                targetMoves: newTargetMoves
            }
        });
    }

    toggleGameOnOff(){
        if(this.state.game === 'on'){
        this.setState(function(){
            return{
                game: 'off'
            }
        });
        } else {
        this.setState(function(){
            return{
                game: 'on'
            }
        });  
        }
    }

    checkMoveCorrectness(input){
        var newMovesArray = this.state.usedMoves.push(input);
        for(let i = 0; i < newMovesArray.length; i++){
            if (this.state.usedMoves[i] !== this.state.targetMoves[i]){
                return false;
            }
        }
        return true;
    }

    startGame(){
        if(this.state.game == 'off'){
            this.setState(function(){
                return {
                    game: 'on',
                    targetMoves: []
                }
            });
            this.incrementTargetMoves();
        }
    }

    checkMoves(){
        console.log('required moves ' + this.state.targetMoves);
        console.log('moves ' + this.state.usedMoves);
    }

    render(){
        return(
            <div className="gameContainer">
                moves:{this.state.usedMoves} game: {this.state.game}
                <button className="button1" onClick={() =>{this.incrementUsedMoves(1)}}>Click Me</button>
                <button className="button2" onClick={() =>{this.incrementUsedMoves(2)}}>Click Me</button>
                <button className="button3" onClick={() =>{this.incrementUsedMoves(3)}}>Click Me</button>
                <button className="button4" onClick={() =>{this.incrementUsedMoves(4)}}>Click Me</button>
                <button className="restartButton" onClick={this.resetMoves}>Restart</button>
                <button className="strictButton" onClick={this.checkMoves}>Strict</button>
                <button className="startButton" onClick={this.startGame}>Start</button>
                <div className="scoreCount">{this.state.usedMoves.length}</div>
                <button onClick={this.toggleGameOnOff}>increment target moves</button>
            </div>
        )
    }
}


module.exports = GameContainer;