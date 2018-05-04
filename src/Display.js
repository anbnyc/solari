import React, { Component } from 'react';
import './App.css';

import Letter from './Letter'

class Display extends Component {

  render() {
    const { alphanum, data, i, dataEnd, length } = this.props
    return (
      <div className="Display section">
        {data.slice(0, length).map((d,ii) => 
          <Letter 
            alphanum={alphanum}
            key={ii}
            position={d}
            i={d === dataEnd[ii] ? 0 : i} />)}
      </div>
    );
  }
}

export default Display;
