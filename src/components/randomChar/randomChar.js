import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GotService from '../../services/gotService';
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

function RandomChar({interval}) {
    const gotService = new GotService();

    const [char, charUpdate] = useState([]);
    const [loading, loadingUpdate] = useState(true);
    const [error, errorUpdate] = useState(false)

    function updateCharacter() {
        const id = Math.floor(Math.random()*1140 + 25);
        gotService.getCharacter(id)
            .then((char) => {
                charUpdate(char);
                loadingUpdate(false);
            })
            .catch(() => {
                errorUpdate(true);
                loadingUpdate(false);
            });
    }

    useEffect(() => {
        updateCharacter();
        let timerId = setInterval(() => updateCharacter(), interval);
        return () => {
            clearInterval(timerId);
        }
    }, [])

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

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number,
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

export default RandomChar;
