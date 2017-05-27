var React = require('react');



var moveAudio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var moveAudio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var moveAudio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var moveAudio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


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
        this.makeNewMove = this.makeNewMove.bind(this);
        this.startNewLevel = this.startNewLevel.bind(this);
        this.resetUsedMoves = this.resetUsedMoves.bind(this);
        this.toggleFlash = this.toggleFlash.bind(this);
        this.flashOnAndOff = this.flashOnAndOff.bind(this);
        this.flashTargetMoves = this.flashTargetMoves.bind(this);
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
        var testArray = JSON.parse(JSON.stringify(this.state.usedMoves));
        console.log(testArray);

        testArray.push(input);
        for(let i = 0; i < testArray.length; i++){
            if (testArray[i] !== this.state.targetMoves[i]){
                return false;
            }
        }
        console.log('true');
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

    makeNewMove(input){
        var button = 'button' + input;
        this.flashOnAndOff(button);
        if(this.checkMoveCorrectness(input) === true){ 
            this.incrementUsedMoves(input);
            this.playSound(input);
            if(this.checkLevelComplete() === true){ /*something is not right here */
                console.log('level was checked');
                this.startNewLevel();
                this.flashTargetMoves();
            }
        }else{
            console.log('false');
            this.resetUsedMoves();
            this.playSound(input);
        }
    }

    playSound(input){
        var audio = moveAudio2;
        switch(input){
            case 1:
            audio = moveAudio1;
            break;
            case 2:
            audio = moveAudio2;
            break;
            case 3:
            audio = moveAudio3;
            break;
            case 4:
            audio = moveAudio4;
            break;
        }
        audio.play();
    }

    checkLevelComplete(){
        if(this.state.usedMoves.length === this.state.targetMoves.length){
            for(let i=0; i<this.state.usedMoves.length; i++){
                if(this.state.usedMoves[i] !== this.state.targetMoves[i]){
                    console.log('arrays do not match');
                    return false;
                }
                console.log('level complete');
                return true;
            }
        }
        console.log('level not complete');
        return false;
    }

    startNewLevel(){
        this.incrementTargetMoves();
        this.resetUsedMoves();
    }

    resetUsedMoves(){
        this.setState(function(){
            return {
                usedMoves: []
            }
        });
    }

    toggleFlash(input){ /* not finished, get it done */ 
        var targetedButton = document.getElementById(input);
        targetedButton.classList.toggle('buttonFlash');
        //console.log(input);
    }

    flashOnAndOff(input){
        this.toggleFlash(input);
        setTimeout(this.toggleFlash, 500, input);
    }



    flashTargetMoves(){
        var that = this;
        var buttonId = "button";
        for(let i=0; i< that.state.targetMoves.length; i++){
            (function(){
                var j = i;
                setTimeout(that.flashOnAndOff, 500,(buttonId + that.state.targetMoves[j]));
                console.log('pressed button = ' + that.state.targetMoves[j]);
            })();
        }
    }

    render(){
        return(
            <div className="gameContainer">
                moves:{this.state.usedMoves} game: {this.state.game}
                <button id="button1" className="button1" onClick={() =>{this.makeNewMove(1)}}>Click Me</button>
                <button id="button2" className="button2" onClick={() =>{this.makeNewMove(2)}}>Click Me</button>
                <button id="button3" className="button3" onClick={() =>{this.makeNewMove(3)}}>Click Me</button>
                <button id="button4" className="button4" onClick={() =>{this.makeNewMove(4)}}>Click Me</button>
                <button className="restartButton" onClick={this.resetMoves}>Restart</button>
                <button className="strictButton" onClick={this.checkMoves}>Strict</button>
                <button className="startButton" onClick={this.startGame}>Start</button>
                <div className="scoreCount">{this.state.targetMoves.length}</div>
                <button onClick={() =>{this.flashTargetMoves()}}>increment target moves</button>
            </div>
        )
    }
}


module.exports = GameContainer;