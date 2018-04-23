import React, { Component } from 'react';
import classNames from 'classnames';

import './Letter.css';

const letterText = (alphanum, position, key, flip) => ({
  top: alphanum[(position + 1) % alphanum.length],
  middle: alphanum[(position + +flip) % alphanum.length],
  bottom: alphanum[position],
})[key]

const Flap = ({ d, i, h, w, flip, text }) =>
  <div 
    className={classNames('flap', d, {
      flip: d === 'middle' && flip
    })}
    style={{ 
      height: h/2+'px', 
      width: w+'px', 
      top: (d === 'bottom' ? h/2 : 0)+'px',
      transform: d === 'middle' ? `rotateX(${-i}deg)` : '',
    }}>
    <span className="text"
      style={{ 
        top: (d === 'bottom' ? -h/2 : 0)+'px',
        transform: d === 'middle' && flip ? 'rotateX(180deg)' : '',
      }}>
      {text}
    </span>
  </div>

class Letter extends Component {

  constructor(props){
    super(props);
    this.state = {
      w: 120,
      m: 10
    }
  }

  render() {
    const { w } = this.state
    const { alphanum, position, i } = this.props
    const h = 1.5*w
    const flip = i >= 90
    return (
      <div className="Letter"
        style={{ height: h+'px', width: w+'px' }}>
        {['top','middle','bottom'].map(d => 
          <Flap key={d} h={h} w={w} d={d} i={i} flip={flip}
            text={letterText(alphanum, position, d, flip)} />)}
          }
      </div>
    );
  }
}

export default Letter;
