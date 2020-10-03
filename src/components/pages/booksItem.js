import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';
import styled from 'styled-components';

const BooksPageDiv = styled.div`
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('https://static.tildacdn.com/tild3433-3262-4633-a165-336235613335/shapeimage_5.png') center center/contain no-repeat;
    height: 380px;
    div {
        min-width: 540px;
        max-height: 250px;
        background-color: rgba(0, 0, 0, 0);
        li {
            background-color: rgba(0, 0, 0, 0);
        }
    }
`;


export default  class BooksItem extends Component {
    gotService = new GotService();
    render() {
        return (
            <BooksPageDiv>
                <ItemDetails
                    itemId={this.props.bookId}
                    getItem={this.gotService.getBook}
                    descr={'book'}
                >
                    <Field field='numberOfPages' label='Number of pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
                </ItemDetails>
            </BooksPageDiv>
        )
    }
};
