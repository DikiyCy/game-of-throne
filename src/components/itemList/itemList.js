import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Spinner from '../spinner';

const ItemListUl = styled.ul`
    padding: 0;
    max-width: 540px;
    border-radius: 5px;
    .list-group-item {
        cursor: pointer;
    }
`;

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
    }, [])

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => {
                        onItemSelected(id);
                    }}
                >
                    {label}
                </li>
            )
        })
    }

    if(!itemList) {
        return <Spinner />
    }

    const items = renderItems(itemList);

    return (
        <ItemListUl>
            {items}
        </ItemListUl>
    );
}

ItemList.defaultProps = {
    onItemSelected: () => {},
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
}

export default ItemList;
