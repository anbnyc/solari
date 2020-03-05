import React, { Component } from 'react';
import './App.css';

const RangeControl = props =>
  (<div className="range-control row">
    <label htmlFor={props.id}>
      <span className="name">{props.label}: </span>
      <span className="value">{props.value}</span>
    </label>
    <input 
      onChange={e => props.changeValue(props.id, +e.target.value)} 
      type='range' 
      min={props.min} 
      max={props.max} 
      value={props.value} 
      id={props.id} />
  </div>)

class Controls extends Component {
  render() {
    return (
      <div className="Controls section">
        <div className="row">Step 
          <span className="value">{this.props.step}</span>
        </div>
        <div className="row">
          <label htmlFor='dataStart'>Start </label>
          <input 
            onChange={e => this.props.changeText('dataStart', e.target.value)} 
            onBlur={e => this.props.padText('dataStart', e.target.value)}
            value={this.props.dataStart} 
            id='dataStart' 
            type='text' />
        </div>
        <div className="row">
          <label htmlFor='data'>End </label>
          <input 
            onChange={e => this.props.changeText('dataEnd', e.target.value)} 
            onBlur={e => this.props.padText('dataEnd', e.target.value)}
            value={this.props.dataEnd} 
            id='dataend' 
            type='text' />
        </div>
        {[{
          id: 'speed',
          label: 'Speed (ms per step)',
          min: 1,
          max: 50,
        },{
          id: 'i',
          label: 'Iteration',
          min: 0,
          max: 180,
        },{
          id: 'length',
          label: 'Length',
          min: 1,
          max: 20,
        }].map(d => 
          <RangeControl key={d.id} {...d}
            value={this.props[d.id]}
            changeValue={this.props.changeValue} />)}
        <div className="row">
          <button onClick={() => this.props.runTransition()}>RUN</button>
        </div>
        <div className="row">
          <button onClick={() => this.props.stopTransition()}>STOP</button>
        </div>
        <div className="row">
          <button onClick={() => this.props.resetTransition()}>RESET</button>
        </div>
      </div>
    );
  }
}

export default Controls;
