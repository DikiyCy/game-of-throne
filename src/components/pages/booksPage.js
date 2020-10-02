import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';


export default class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }
    onItemSelected = (id) => {
        this.setState({
            selectedBook: id,
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
                getData={this.gotService.getAllBooks}
                renderItem={({name, publisher}) => `${name} (${publisher})`}
            />
        )
        const bookDetails = (
            <ItemDetails
                itemId={this.state.selectedBook}
                getItem={this.gotService.getBook}
                descr={'book'}
            >
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}
