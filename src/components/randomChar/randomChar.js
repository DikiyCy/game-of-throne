import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomCharDiv = styled.div`
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        margin-bottom: 40px;
        h4 {
            margin-bottom: 20px;
            text-align: center;
        }
`;

const RandomCharSpan = styled.div`
    font-weight: bold;
`;

export default class RandomChar extends Component {
    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 5000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random()*1140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null
        return (
            <RandomCharDiv className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomCharDiv>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <RandomCharSpan>Gender </RandomCharSpan>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomCharSpan>Born </RandomCharSpan>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomCharSpan>Died </RandomCharSpan>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <RandomCharSpan>Culture </RandomCharSpan>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
