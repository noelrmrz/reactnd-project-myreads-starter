import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaultImage from './images/File_No_image_available.png'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  checkAuthors(book) {
    if ('authors' in book)
      return (
        book.authors.map((author, index) => (
          <div key={index} className="book-authors">{author}</div>
        ))
      )
    else
      return (
        <div className="book-authors">Unknown</div>
      )
  }

  checkThumbnail(book) {
    if ('imageLinks' in book)
      return (
        book.imageLinks.thumbnail
      )
    else
      return (
        defaultImage
      )
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.checkThumbnail(book)})` }}></div>
                <BookshelfChanger
                  book={book}
                  updateMethod={this.props.updateMethod} />
              </div>
              <div className="book-title">{book.title}</div>
              {this.checkAuthors(book)}
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default Book