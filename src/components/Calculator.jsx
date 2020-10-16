import React from "react"
import DisplayOutput from './DisplayOutput.jsx';
import DisplayKeys from "./DisplayKeys.jsx";
import ScientificMode from "./ScientificMode.jsx";
import "./calculator.css"

class SimpleCalculator extends React.Component {
    constructor(){
        super();

        this.state = {
            result: 0,
            currentValue: 0,
            lastValue: 0,
            operator: null,
            lightTheme: true,
            scientificMode: false,
            showResult: false
        }
        this.onClickDigit = this.onClickDigit.bind(this)
        this.onClickOperator = this.onClickOperator.bind(this)
        this.calculate = this.calculate.bind(this)
        this.reset = this.reset.bind(this)
        this.changeMode = this.changeMode.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
        this.flipSign = this.flipSign.bind(this)
        this.calculateSquare = this.calculateSquare.bind(this)
        this.calculateSquareRoot = this.calculateSquareRoot.bind(this)
    }
    onClickDigit (val){
        if(this.state.operator == "=") this.reset()
        this.setState({
            currentValue: this.state.currentValue == 0 ? val : this.state.currentValue + val,
            showResult: false
        })
    };
    onClickOperator (ope){
        if(this.state.operator == "=") this.reset()
        if(this.state.currentValue){
            this.calculate(this.state.operator, this.state.currentValue)
            this.setState({
                lastValue: this.state.currentValue,
                operator: ope,
                currentValue: 0,
                showResult: true
            })
        }
    };

    calculate (op,  lop) {
        lop = Number(lop)
        let result = this.state.result
        switch (op) {
            case '+':
                result += lop
              break;
            case '-':
                result -= lop
              break;
            case '*':
                result *= lop || 1
              break;
            case '/':
                result /= lop || 1
              break;
            case '=':
                this.calculate(this.state.operator, lop)
              break;
            default:
                result = lop
                break;
            }
            console.log("result "+ result)
            this.setState({
                result: result,
            })
    };
    flipSign(){
        if(this.state.operator == "=") this.reset()
        if(this.state.currentValue > 0){
            this.setState({
                currentValue: -Math.abs(this.state.currentValue)
            })
        }else{
            this.setState({
                currentValue: Math.abs(this.state.currentValue)
            })
        }
    }
    calculateSquare(){
        if(this.state.operator == "=") this.reset()
        this.setState({
            currentValue: Math.pow(this.state.currentValue, 2)
        })
    }
    calculateSquareRoot(){
        if(this.state.operator == "=") this.reset()
        if(this.state.currentValue<0) return
        this.setState({
            currentValue: Math.sqrt(this.state.currentValue)
        })
    }
    reset () {
        this.setState({
            result: 0,
            currentValue: 0,
            lastValue: 0,
            showResult: true,
            operator: null
        })
    };
    changeMode () {
        this.setState({
            scientificMode: !this.state.scientificMode
        })
    }
    changeTheme (val) {
        this.setState({
            lightTheme: val
        })
    }

    render() {
        return (
            <div>
                <div className="button-sm calculator ">
                    <button onClick={this.changeMode}>Scientific Mode</button><br/>
                    <button onClick={()=>this.changeTheme(true)}>Light Theme</button>
                    <button onClick={()=>this.changeTheme(false)}>Dark Theme</button>
                </div>
                <div className={"calculator " + (this.state.lightTheme ? " calculator-light ":" calculator-dark")}>
                    <DisplayOutput 
                        output={this.state.result}
                        showResult = {this.state.showResult}
                        currentValue = {this.state.currentValue}
                    />
                    <DisplayKeys 
                        onClickDigit={this.onClickDigit}
                        onClickOperator={this.onClickOperator} 
                        theme = {this.state.lightTheme}
                        reset = {this.reset} 
                        displayResult = {this.displayResult} 
                    />
                    { this.state.scientificMode && 
                        <ScientificMode 
                            theme = {this.state.lightTheme}
                            calculateSquare = {this.calculateSquare}
                            calculateSquareRoot = {this.calculateSquareRoot}
                            flipSign = {this.flipSign}
                        /> 
                    }
                </div>
            </div>
        );
    }
}
export default SimpleCalculator;