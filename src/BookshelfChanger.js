import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookshelfChanger extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
      }

      updateOption = (option) =>{

      }

    render() {
        return (
            <select onChange={(event) => this.updateOption(event.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
    )
    }
}

export default BookshelfChanger