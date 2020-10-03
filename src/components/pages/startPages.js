import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const StartPagesDiv = styled.div`
    color: #000;
    background-color: #fff;
    padding: 25px 25px;
    border-radius: 5px;
    max-width: 540px;
    margin: 0 auto;
    text-align: center;
    h1 {
        font-size: 30px;
    }
    hr {
        width: calc(100% + 50px);
        transform: translateX(-25px);
    }
`;

export default class StartPages extends Component {
    render() {
        return (
            <StartPagesDiv>
                <h1>"The Game of Thrones" app</h1>
                <hr/>
                <h4>You can visit links:</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Link to='/characters/'>List of characters</Link>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Link to='/houses/'>List of houses</Link>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Link to='/books/'>List of books</Link>
                    </li>
                </ul>
            </StartPagesDiv>
        )
    }
}
