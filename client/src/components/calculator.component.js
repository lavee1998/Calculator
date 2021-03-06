import React from "react";
import API from "../utils/API";
import CalculatorButtons from "../utils/constants";

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      prevValue: "",
      operations: ["+", "-", "*", "/", "."],
      currValue: "",
      result: "",
      message: "Welcome to my Calculator Application!",
      deletebuttons: ["AC", "C"],
      buttons: CalculatorButtons,
    };
  }
  sendMessage(message) {
    console.log(message);
    this.setState({ message: message });
  }

  readNumberFromFile() {
    console.log("Read the number from the file!");

    API.getNumberById("mynumber")
      .then((res) => {
        this.setState({ result: res.data.value }, () =>
          this.sendMessage("The number value: " + this.state.result + "\n")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  writeNumberToFile() {
    if (isNaN(this.state.result) || this.state.result === "") {
      this.setState({
        message: "Your expression is not a number, please edit it!",
      });
      return; //check if the result is a number or not
    }

    if (
      this.state.result.length > 1 &&
      this.state.result[0] === "0" &&
      this.state.result[1] !== "."
    ) {
      this.sendMessage(
        "Your expression is wrong. Please make it correct (use AC/C) !"
      );
      return;
    }

    console.log("Write the number to the file!");

    const obj = { id: "mynumber", value: this.state.result };
    API.updateNumber("mynumber", obj)
      .then((res) => {
        this.sendMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendMessageToWrite(data) {
    console.log(data);
  }

  updateValues = (value) => {
    this.setState({ currValue: this.state.currValue }, () =>
      this.updatePrevValue(value)
    );
  };

  updatePrevValue = (value) => {
    this.setState({ prevValue: value });
  };

  componentDidMount() {
    //init
    const obj = { id: this.state.myId, value: "0" };
    API.updateNumber("mynumber", obj)
      .then((res) => {
        console.log("Initialization succesful!");
      })
      .catch((err) => {
        API.addNumber(obj)
          .then((res) => console.log("Initialization succesful!"))
          .catch((error) => {
            console.log(error);
          });
      });
  }

  splitByOperators() {
    return this.state.result
      .split("*")
      .join(",")
      .split("+")
      .join(",")
      .split("-")
      .join(",")
      .split("/")
      .join(",")
      .split(",");
  }

  CheckExpression() {
    let prev = "";
    let curr = "";

    for (let index = 0; index < this.state.result.length - 1; index++) {
      prev = this.state.result[index];
      curr = this.state.result[index + 1];
      if (
        this.state.operations.includes(prev) &&
        this.state.operations.includes(curr)
      ) {
        this.sendMessage(
          "Your expression is wrong. Please make it correct (use AC/C) !"
        );
        return false;
      }
    }
    if (typeof this.state.result === "string") {
      let mytags = this.splitByOperators();

      for (let i = 0; i < mytags.length; ++i) {
        if (
          mytags[i].length > 1 &&
          mytags[i][0] === "0" &&
          mytags[i][1] !== "."
        ) {
          this.sendMessage(
            "Your expression is wrong. Please make it correct (use AC/C) !"
          );
          return false;
        }
      }
    }
    return true;
  }

  addToExpression = (value) => {
    this.sendMessage(""); //change the result to default

    if (this.state.result !== "") {
      this.updateValues(value);
    }
    if (value === "AC") {
      this.setState({ result: "" });
    } else if (value === "C") {
      if (this.state.prevValue !== "=") {
        this.setState({ result: this.state.result.slice(0, -1) });
      } else {
        this.setState({ result: this.state.result });
      }
    } else if (value === "=") {
      if (
        this.state.result === "" ||
        this.state.operations.includes(this.state.prevValue)
      ) {
        this.sendMessage(
          "Your expression is wrong. Please make it correct (use AC/C) !"
        );
        return;
      }
     

      if (!this.CheckExpression()) {
        return this.sendMessage(
          "Your expression is wrong. Please make it correct (use AC/C) !"
        );
      }
      this.setState({ result: eval(this.state.result) });
    } else {
      this.setState({ result: this.state.result + value });
    }
  };

  listButtons() {
    let buttons = this.state.buttons;
    let deletebuttons = this.state.deletebuttons;
    return (
      <div>
        {deletebuttons.map((value, index) => {
          return (
            <button
              key={index}
              className="responsive long"
              onClick={() => this.addToExpression(value)}
            >
              {" "}
              {value}{" "}
            </button>
          );
        })}
        {buttons.map((value, index) => {
          return (
            <button
              className="responsive"
              key={index}
              onClick={() => this.addToExpression(value)}
            >
              {" "}
              {value}{" "}
            </button>
          );
        })}
        <button className="responsive long" onClick={() => this.readNumberFromFile()}>
          {" "}
          READ{" "}
        </button>
        <button className="responsive long" onClick={() => this.writeNumberToFile()}>
          {" "}
          WRITE{" "}
        </button>
      </div>
    );
  }

  render() {
    let myresult = this.state.result;
    return (
      <div>
        <div className="calculator">
          <h1>CALCULATOR</h1>
          <textarea readOnly value={this.state.message}></textarea>
          <div>
            <input
              className="result"
              type="text"
              readOnly
              value={myresult}
            ></input>
          </div>
          {this.listButtons()}
        </div>
      </div>
    );
  }
}

export default Calculator;
