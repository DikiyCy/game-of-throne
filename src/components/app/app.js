import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem, StartPages, UnknownPage} from '../pages';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

import styled from 'styled-components';

const AppDiv = styled.div`
    background: rgb(62,126,164) url('img/got.jpg') center top/cover no-repeat;
    background-size: cover;
    height: 1000px;
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
    gotService = new GotService();

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
            <Router>
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

                        <Switch>
                            <Route path='/' exact component={StartPages}/>
                            <Route path='/characters' exact component={CharacterPage}/>
                            <Route path='/houses' exact component={HousesPage}/>
                            <Route path='/books' exact component={BooksPage}/>
                            <Route path='/books/:id' render={
                                ({match, history, location}) => {
                                        const {id} = match.params;
                                        return <BooksItem bookId={id}/>
                                    }
                            }/>
                            <Route path='/*' component={UnknownPage}/>
                        </Switch>
                    </Container>
                </AppDiv>
            </Router>
        )
    }
}
