import React from 'react';
import classses from './backdrop.css';

const BackDrop = (props) => {
  return (
    props.show ? <div className={classses.Backdrop} onClick={props.clicked}></div> : null
  ) 
}

export default BackDrop;