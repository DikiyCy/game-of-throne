import React from 'react';
import './error.css';
import img from './error.jpg';

const ErrorMessage  = () => {
    return (
        <>
            <img src={img} alt="error"></img>
            <span>Somethin goes wrong</span>
        </>
    )
}

export default ErrorMessage;
