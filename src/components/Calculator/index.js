import React from "react";
import "./index.css";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      currVal: 0,
      prevVal: null,
      operation: null,
      result: null
    };
  }

  componentWillMount = () => {
    document.addEventListener("keyup", this.handleKeyPress);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keyup", this.handleKeyPress);
  };

  handleKeyPress = e => {
    const simClick = id => document.getElementById(id).click();
    const keyCode = e.keyCode;
    switch (keyCode) {
      // Clear
      case 12:
        simClick("clear");
        break;
      // Equals
      case 13:
        simClick("equals");
        break;
      // Zero
      case 48:
        simClick("zero");
        break;
      // One
      case 49:
        simClick("one");
        break;
      // Two
      case 50:
        simClick("two");
        break;
      // Three
      case 51:
        simClick("three");
        break;
      // Four
      case 52:
        simClick("four");
        break;
      // Five
      case 53:
        simClick("five");
        break;
      // Six
      case 54:
        simClick("six");
        break;
      // Seven
      case 55:
        simClick("seven");
        break;
      // Eight
      case 56:
        simClick("eight");
        break;
      // Nine
      case 57:
        simClick("nine");
        break;
      // Multiply
      case 106:
        simClick("multiply");
        break;
      // Add
      case 107:
        simClick("add");
        break;
      // Subtract
      case 109:
        simClick("subtract");
        break;
      // Subtract
      case 110:
        simClick("decimal");
        break;
      // Divide
      case 111:
        simClick("divide");
        break;
      default:
        console.log(keyCode + " doesn't have a switch case");
        break;
    }
  };

  handleClear = e => {
    e.preventDefault();
    // Reset state
    this.setState({
      display: 0,
      currVal: 0,
      prevVal: null,
      operation: null,
      result: null
    });
  };

  handleNumberClick = e => {
    e.preventDefault();

    let val = String(e.target.innerHTML);
    const curr = String(this.state.currVal);

    val = curr + val;
    // Remove unnecessary zeros
    val = val.replace(/^0+(?=\d)/g, "");
    // Remove multiple decimals points
    val = val.replace(/\.{2,}/g, ".").replace(/(^\d+\.\d+)\./, "$1");

    if (this.state.result) this.setState({ prevVal: this.state.result });

    this.setState({
      display: val,
      currVal: val
    });
  };

  handleOperationClick = e => {
    e.preventDefault();

    const optn = String(e.target.id);
    const curr = this.state.currVal;

    if (!this.state.operation) {
      this.setState({
        prevVal: curr,
        currVal: 0,
        operation: optn
      });
    } else {
      this.calculate();
      this.setState({ operation: optn });
    }
  };

  handleCalculate = e => {
    e.preventDefault();
    this.calculate();
  };

  calculate = () => {
    const curr = parseFloat(this.state.currVal);
    const prev = parseFloat(this.state.prevVal);
    const optn = this.state.operation;
    let res;

    switch (optn) {
      case "add":
        res = prev + curr;
        break;
      case "subtract":
        res = prev - curr;
        break;
      case "multiply":
        res = prev * curr;
        break;
      case "divide":
        res = prev / curr;
        break;
      default:
        this.setState({ display: "ERROR" });
        break;
    }

    this.setState({
      display: res,
      currVal: 0,
      result: res,
      operation: null
    });
  };

  render() {
    const display = this.state.display;

    return (
      <div className="calculator">
        <div id="display" className="display">
          {display}
        </div>
        <div id="button_cntr" className="buttons">
          <button
            id="clear"
            className="action-buttons"
            onClick={this.handleClear}
          >
            AC
          </button>
          <button
            id="divide"
            className="action-buttons"
            onClick={this.handleOperationClick}
          >
            ÷
          </button>
          <button
            id="multiply"
            className="action-buttons"
            onClick={this.handleOperationClick}
          >
            x
          </button>
          <button id="seven" onClick={this.handleNumberClick}>
            7
          </button>
          <button id="eight" onClick={this.handleNumberClick}>
            8
          </button>
          <button id="nine" onClick={this.handleNumberClick}>
            9
          </button>
          <button
            id="subtract"
            className="action-buttons"
            onClick={this.handleOperationClick}
          >
            -
          </button>
          <button id="four" onClick={this.handleNumberClick}>
            4
          </button>
          <button id="five" onClick={this.handleNumberClick}>
            5
          </button>
          <button id="six" onClick={this.handleNumberClick}>
            6
          </button>
          <button
            id="add"
            className="action-buttons"
            onClick={this.handleOperationClick}
          >
            +
          </button>
          <button id="one" onClick={this.handleNumberClick}>
            1
          </button>
          <button id="two" onClick={this.handleNumberClick}>
            2
          </button>
          <button id="three" onClick={this.handleNumberClick}>
            3
          </button>
          <button
            id="equals"
            className="action-buttons"
            onClick={this.handleCalculate}
          >
            =
          </button>
          <button id="zero" onClick={this.handleNumberClick}>
            0
          </button>
          <button id="decimal" onClick={this.handleNumberClick}>
            .
          </button>
        </div>
      </div>
    );
  }
}
