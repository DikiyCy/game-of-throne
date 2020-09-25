import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

import styled from 'styled-components';

const AppDiv = styled.div`
    a {
        color: inherit;
        text-decoration: none;
    }
    a:visited {
        text-decoration: none;
        color: inherit;
    }
    a:hover {
        text-decoration: none;
        color: inherit;
    }
    a:focus {
        text-decoration: none;
        color: inherit;
    }
    a:active {
        text-decoration: none;
        color: inherit;
    }
    .active {
        display: none;
    }
`;

const Button = styled.button`
    width: 250px;
    height: 45px;
    background-color: #000;
    border-radius: 5px;
    font-family: 'Roboto';
    border: 1px solid #fff;
    margin-bottom: 40px;
    color: #fff;
`;

export default class App extends Component {
    state = {
        showRandomChar: true,
        selectedChar: null
    }
    onToggleClass = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    onCharSelected = (id) => {
        console.log('Нажал,бля, на ' + id + ' !!')
        this.setState({
            selectedChar: id,
        })
    }

    render() {
        const {showRandomChar} = this.state;
        const randomChar = showRandomChar ? <RandomChar /> : null;
        return (
            <AppDiv>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomChar}
                        <Button
                            onClick={this.onToggleClass}
                        >
                            Toggle random character
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onCharSelected={this.onCharSelected}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails
                                charId={this.state.selectedChar}
                            />
                        </Col>
                    </Row>
                </Container>
            </AppDiv>
        )
    }
}
