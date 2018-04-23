import React, { Component } from 'react';
import './App.css';

class Controls extends Component {
  render() {
    return (
      <div className="Controls section">
        <div className="row">
          <label htmlFor='data'>Start</label>
          <input 
            onChange={e => this.props.changeText('data', e.target.value)} value={this.props.data} id='data' type='text' />
        </div>
        <div className="row">
          <label htmlFor='data'>End</label>
          <input 
            onChange={e => this.props.changeText('dataEnd', e.target.value)} value={this.props.dataEnd} id='dataend' type='text' />
        </div>
        {/*<div className="row">
          <label htmlFor='range'>Word length</label>
          <input 
            onChange={() => {}} type='range' min='1' max='10' value='4' id='range' />
        </div>*/}
        <div className="row">
          <button
            onClick={() => this.props.runTransition()}>RUN</button>
        </div>
      </div>
    );
  }
}

export default Controls;
