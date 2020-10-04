import React from 'react';
import './error.css';
import img from './error.jpg';

const ErrorMessage  = () => {
    return (
        <div className="eror-block">
            <img src={img} alt="error"></img>
            <span>Somethin goes wrong</span>
        </div>
    )
}

export default ErrorMessage;
