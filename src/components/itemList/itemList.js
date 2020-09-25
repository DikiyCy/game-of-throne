import React, {Component} from 'react';
import gotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';

const ItemListUl = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;
export default class ItemList extends Component {
    gotService = new gotService();

    state = {
        charList: null
    }
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                console.log(charList);
                this.setState({
                    charList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}
                >
                    {name}
                </li>
            )
        })
    }

    render() {
        const {charList} = this.state;

        if(!charList) {
            return <Spinner />
        }

        const items = this.renderItems(charList);

        return (
            <ItemListUl>
                {items}
            </ItemListUl>
        );
    }
}
