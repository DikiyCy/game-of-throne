import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';


class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false
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
        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name, publisher}) => `${name} (${publisher})`}
            />
        )
    }
}

export default withRouter(BooksPage);
