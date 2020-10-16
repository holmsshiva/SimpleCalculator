import React, {Component} from 'react';

function ScientificMode (props) {

        return (
            <div className={"button scibtn "+ (props.theme ? " button-light ":" button-dark")}>
                <button name="sign" onClick={e => props.flipSign(e.target.name)}>Sign</button>
                <button name="square" onClick={e => props.calculateSquare(e.target.name)}>Square</button>
                <button name="root" onClick={e => props.calculateSquareRoot(e.target.name)}>Sqaure root</button>
            </div>
        );
}


export default ScientificMode;