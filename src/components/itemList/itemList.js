import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import GotService from '../../services/gotService';

const ItemListUl = styled.ul`
    padding: 0;
    max-width: 540px;
    border-radius: 5px;
    .list-group-item {
        cursor: pointer;
    }
`;

const ItemList = (props) => {

    const renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item;
            const label = props.renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => {
                        props.onItemSelected(id);
                    }}
                >
                    {label}
                </li>
            )
        })
    }

    const {data} = props;
    const items = renderItems(data);
    return (
            <ItemListUl>
                {items}
            </ItemListUl>
    )
}
// Implementation with classes:

// class ItemList extends Component {
//     renderItems(arr) {
//         return arr.map((item) => {
//             const {id} = item;
//             const label = this.props.renderItem(item);
//             return (
//                 <li
//                     className="list-group-item"
//                     key={id}
//                     onClick={() => {
//                         this.props.onItemSelected(id);
//                     }}
//                 >
//                     {label}
//                 </li>
//             )
//         })
//     }
//     render() {
//         const {data} = this.props;
//         const items = this.renderItems(data);
//         return (
//             <ItemListUl>
//                 {items}
//             </ItemListUl>
//         );
//     }
// }

ItemList.defaultProps = {
    onItemSelected: () => {},
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
}

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null
        }
        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
        }

        render() {
            const {data} = this.state;

            if(!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data}/>
        }
    }
}

const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);
