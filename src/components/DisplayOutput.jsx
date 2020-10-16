import React, {Component} from 'react';

class DisplayOutput extends Component {


    render() {
        let {output, currentValue, showResult} = this.props;
        return (

            <div className="output">
                { showResult ?<p>{output}</p> : <p>{currentValue}</p> }
            </div>
        );
    }
}


export default DisplayOutput;