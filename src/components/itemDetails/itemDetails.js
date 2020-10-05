import React, {useState, useEffect} from 'react';
import styled from 'styled-components';


const ItemDetailsDiv = styled.div`
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        margin-bottom: 40px;
        max-width: 540px;
        h4 {
            margin-bottom: 20px;
            text-align: center;
        }
        .select-error {
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

function ItemDetails({itemId, getItem, descr, children}) {

    const [item, newItemIUpdate] = useState(null);

    function updateItem() {
        if (!itemId) return;

        getItem(itemId)
            .then((data) => {
                newItemIUpdate(data)
            })
    }
    useEffect(() => {
        updateItem();
    }, [itemId])

    if (!item) {
        return <ErrorSpan className="select-error">
            Please, select a {descr}
        </ErrorSpan>
    }
    const {name} = item;
    return (
        <ItemDetailsDiv className="char-details rounded">
            <ItemDetailsTitle>{name}</ItemDetailsTitle>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </ItemDetailsDiv>
    );
}

export default ItemDetails;
