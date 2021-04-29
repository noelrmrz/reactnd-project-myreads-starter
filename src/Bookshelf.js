import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static propTypes = {
        shelf: PropTypes.array.isRequired
      }

    render() {
        const shelf = this.props.shelf
        console.log(shelf)
        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf[0].shelfTitle}</h2>
            <Book className="bookshelf-books" />
        </div>
        )
    }
}

export default Bookshelf