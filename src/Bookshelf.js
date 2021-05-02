import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render() {
        const books = this.props.books
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <Book className="bookshelf-books" books={books} updateMethod={this.props.updateMethod} />
            </div>
        )
    }
}

export default Bookshelf