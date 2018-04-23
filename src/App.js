import React, { Component } from 'react';
import { timer } from 'd3-timer'

import Display from './Display'
import Controls from './Controls'
import './App.css';

const alphanum = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  '1','2','3','4','5','6','7','8','9','0',' '
]

const stringToIndexArray = (text,maxLen) => text
  .replace(/[^a-zA-Z0-9\s]/g,'')
  .split('')
  .map(d => alphanum.indexOf(d.toUpperCase()))
  .slice(0, maxLen ? maxLen : text.length)
let t;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      speed: 20,
      data: [13, 4, 22, 36, 24, 14, 17, 10],
      dataEnd: [36, 2, 7, 8, 2, 0, 6, 14],
      i: 0,
    }
    this.runTransition = this.runTransition.bind(this)
    this.changeText = this.changeText.bind(this)
  }

  changeText(field, text){
    let clean = stringToIndexArray(text)
    let newDataEnd
    if(field === 'data' && clean.length !== this.state.dataEnd.length){
      newDataEnd = Array(Math.max(0, clean.length - this.state.dataEnd.length)).fill(36).concat(this.state.dataEnd)
    } else if (field === 'dataEnd' && clean.length !== this.state.data.length){
      clean = Array(Math.max(0, this.state.data.length - clean.length)).fill(36).concat(clean)
    }
    this.setState({ 
      [field]: clean,
      ...(newDataEnd ? { dataEnd: newDataEnd } : {} )
    })
  }

  runTransition(){
    const { data, dataEnd, speed } = this.state;
    let i = 0
    t = timer(() => {
      i += speed
      this.setState({ i })
      if(i >= 180){
        i = 0;
        this.setState({
          i,
          data: data.map((d,ii) => d === dataEnd[ii] ? d : (d+1) % alphanum.length)
        })
        if(data.reduce((t,v,ii) => t && v === dataEnd[ii], true)){
          t.stop()
        }
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Controls
          data={this.state.data.map(d => alphanum[d]).join('')}
          dataEnd={this.state.dataEnd.map(d => alphanum[d]).join('')}
          changeText={this.changeText}
          runTransition={this.runTransition}/>
        <Display 
          alphanum={alphanum}
          {...this.state} />
      </div>
    );
  }
}

export default App;
