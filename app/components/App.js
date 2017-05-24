var React = require('react');
var GameContainer = require('./GameContainer.js');

export class App extends React.Component {
    render(){
        return(
                <GameContainer />
        )
    }
}

module.exports = App;