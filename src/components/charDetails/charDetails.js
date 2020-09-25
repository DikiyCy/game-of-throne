import React, {Component} from 'react';
import gotService from '../../services/gotService';

import styled from 'styled-components';


const CharDetailsDiv = styled.div`
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        margin-bottom: 40px;
        h4 {
            margin-bottom: 20px;
            text-align: center;
        }
        .select-error {   /*потом изменить */
            color: #fff;
            text-align: center;
            font-size: 26px;
        }
`;
const ErrorSpan = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

const CharDetailsTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

export default class CharDetails extends Component {
    gotService = new gotService();

    state = {
        char: null
    }
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) return;

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({ char })
            })
    }

    render() {
        if (!this.state.char) {
            return <ErrorSpan className="select-error">
                Please, selected a character
            </ErrorSpan>
        }
        const {name, gender, born, died, culture} = this.state.char;

        return (
            <CharDetailsDiv className="char-details rounded">
                <CharDetailsTitle>{name}</CharDetailsTitle>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </CharDetailsDiv>
        );
    }
}
