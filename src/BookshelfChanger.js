import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookshelfChanger extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    state = {
        shelf: this.props.book.shelf
    }

    checkIfShelfExists(shelf) {
        console.log(shelf)
        switch(shelf) {
            case('currentlyReading'):
            return 'Currently Reading'
            case('wantToRead'):
            return 'Want to Read'
            case('read'):
            return 'Read'
            default:
                return 'None'
        }
    }

    getShelf(shelf) {
        switch(shelf) {
            case('Currently Reading'):
            return 'currentlyReading'
            case('Want to Read'):
            return 'wantToRead'
            case('Read'):
            return 'read'
            default:
                return 'none'
        } 
    }

    updateBook = (option) => {
        BooksAPI.update(this.props.book, this.getShelf(option))
            .then((results) => {
                this.setState(() => ({
                    shelf: this.getShelf(option)
                }), this.props.updateMethod())
            })
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.checkIfShelfExists(this.state.shelf)} onChange={(event) => this.updateBook(event.target.value)}>
                    <option disabled>Move to...</option>
                    <option>Currently Reading</option>
                    <option>Want to Read</option>
                    <option>Read</option>
                    <option>None</option>
                </select>
            </div>
        )
    }
}

export default BookshelfChanger