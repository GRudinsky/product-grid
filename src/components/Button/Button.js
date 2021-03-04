import React from 'react';
import './Button.scss';

const Button = ({ clickHandler, text }) => {
  return (
    <button className="button" onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
