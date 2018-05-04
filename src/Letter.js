import React, { Component } from 'react';
import classNames from 'classnames';

import './Letter.css';

const letterText = (alphanum, position, key, flip) => ({
  top: alphanum[(position + 1) % alphanum.length],
  middle: alphanum[(position + +flip) % alphanum.length],
  bottom: alphanum[position],
})[key]

const Flap = ({ d, i, flip, text }) =>
  (<div 
    className={classNames('flap', d, { flip: d === 'middle' && flip })}
    style={{ transform: d === 'middle' ? `rotateX(${-i}deg)` : '' }}>
    <span className="text"
      style={{ transform: d === 'middle' && flip ? 'rotateX(180deg)' : '' }}>
      {text}
    </span>
  </div>)

const Letter = ({ alphanum, position, i}) => {
  const flip = i >= 90;
  return (<div className="Letter">
    {['top','middle','bottom'].map(d => 
      <Flap key={d} d={d} i={i} flip={flip} 
        text={letterText(alphanum, position, d, flip)} />)}}
  </div>)
}

export default Letter;