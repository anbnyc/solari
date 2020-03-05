import React, { Component } from "react";

import Display from "./Display";
import Controls from "./Controls";
import "./App.css";

const alphanum = [
  " ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

const stringToIndexArray = (text, maxLen) =>
  text
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split("")
    .map(d => alphanum.indexOf(d.toUpperCase()))
    .slice(0, maxLen ? maxLen : text.length);
const padder = (len, arr) =>
  Array(Math.max(0, len - arr.length))
    .fill(0)
    .concat(arr)
    .slice(0, len);
let t;
const l = 9;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 15,
      length: l,
      dataStart: padder(l, stringToIndexArray("THANK YOU")),
      dataEnd: padder(l, stringToIndexArray(" DANKE   ")),
      i: 0,
      step: 0,
    };
    this.runTransition = this.runTransition.bind(this);
    this.resetTransition = this.resetTransition.bind(this);
    this.changeText = this.changeText.bind(this);
    this.padText = this.padText.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.stopTransition = this.stopTransition.bind(this);
  }

  componentWillMount() {
    this.setState({
      data: this.state.dataStart,
    });
  }

  changeValue(field, value) {
    this.setState({ [field]: value });
  }

  changeText(field, text) {
    const newText = stringToIndexArray(text) || [""];
    this.setState({
      i: 0,
      [field]: newText,
      ...(field === "dataStart" ? { data: newText } : {}),
    });
  }

  padText(field, text) {
    const clean = stringToIndexArray(text);
    const newLen = Math.max(this.state.length, clean.length);
    const padded = padder(newLen, clean);
    this.setState({
      [field]: padded,
      length: newLen,
    });
  }

  runTransition() {
    let i = 0;
    const raf = () => {
      const { speed, step } = this.state;
      i += speed;
      this.setState({ i, speed: speed });
      if (i >= 180) {
        i = 0;
        this.setState({
          i,
          step: step + 1,
          data: this.state.data.map((d, ii) =>
            d === this.state.dataEnd[ii] ? d : (d + 1) % alphanum.length
          ),
        });
      }
      if (
        this.state.data.reduce(
          (t, v, ii) => t && v === this.state.dataEnd[ii],
          true
        )
      ) {
        this.stopTransition();
        setTimeout(() => {
          t = requestAnimationFrame(raf);
          this.setState({
            i: 0,
            dataStart: this.state.dataEnd, //
            dataEnd: this.state.dataStart, //
          });
        }, 1000);
      } else {
        t = requestAnimationFrame(raf);
      }
    };
    raf();
  }

  stopTransition() {
    cancelAnimationFrame(t);
    this.setState({
      step: 0,
    });
  }

  resetTransition() {
    this.stopTransition();
    this.setState({
      data: this.state.dataStart,
      step: 0,
      i: 0,
    });
  }

  render() {
    return (
      <div className="App">
        <Controls
          {...this.state}
          dataStart={this.state.dataStart.map(d => alphanum[d]).join("")}
          dataEnd={this.state.dataEnd.map(d => alphanum[d] || "").join("")}
          changeValue={this.changeValue}
          changeText={this.changeText}
          padText={this.padText}
          runTransition={this.runTransition}
          stopTransition={this.stopTransition}
          resetTransition={this.resetTransition}
        />
        <Display alphanum={alphanum} {...this.state} />
      </div>
    );
  }
}

export default App;
