import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';


export default class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }
    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id,
        })
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const {error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}
            />
        )
        const houseDetails = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getItem={this.gotService.getHouse}
                descr={'house'}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral weapons'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}
