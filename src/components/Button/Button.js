import React from 'react';
import './Button.scss';

const Button = ({ id, clickHandler, text }) => {
  return (
    <button id={`${id}__button`} className="button" onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
