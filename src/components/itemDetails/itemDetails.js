import React, {Component} from 'react';
import gotService from '../../services/gotService';

import styled from 'styled-components';


const ItemDetailsDiv = styled.div`
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
const ItemDetailsTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {
    gotService = new gotService();

    state = {
        item: null
    }
    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem = () => {
        const {itemId, getItem} = this.props;
        if (!itemId) return;

        getItem(itemId)
            .then((item) => {
                this.setState({ item })
            })
    }

    render() {
        if (!this.state.item) {
            return <ErrorSpan className="select-error">
                Please, selected a {this.props.descr}
            </ErrorSpan>
        }
        const {item} = this.state;
        const {name} = item;

        return (
            <ItemDetailsDiv className="char-details rounded">
                <ItemDetailsTitle>{name}</ItemDetailsTitle>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }

                </ul>
            </ItemDetailsDiv>
        );
    }
}
