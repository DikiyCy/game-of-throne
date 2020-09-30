import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';

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
        error: false
    }
    onToggleClass = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {
        const {showRandomChar, error} = this.state;
        if (error ) {
            return <ErrorMessage />
        }
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
                    <CharacterPage />
                </Container>
            </AppDiv>
        )
    }
}
