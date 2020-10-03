import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const UnknownPageDiv = styled.div`
    color: #000;
    background-color: #fff;
    padding: 25px 25px;
    border-radius: 5px;
    max-width: 540px;
    margin: 0 auto;
    text-align: center;
    h3 {
        margin-bottom: 25px;
    }

`;

export default class UnknownPage extends Component {
    render() {
        return (
            <UnknownPageDiv>
                <h3>This page does not exist</h3>
                <hr />
                <Link to="/">&#10229; Back to top</Link>
            </UnknownPageDiv>

        )
    }
}
