import React from 'react'
import './App.css'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    readBooks: [],
    currentBooks: [],
    futureBooks: []
  }

  /**
   * Returns the list of books on the users bookshelves
   */
  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          readBooks: books.filter(book => book.shelf === 'read'),
          currentBooks: books.filter(book => book.shelf === 'currentlyReading'),
          futureBooks: books.filter(book => book.shelf === 'wantToRead')
        }))
        books.forEach(book => {
          //console.log(book)
          //BooksAPI.update(book, book.shelf)
        })})
/*       .then((books) => {
        books.forEach(book => {
          console.log(book.shelf)
          BooksAPI.update(book, book.shelf)
        })
      }) */
  }

  componentDidMount() {
    this.getAllBooks()
    //this.updateInitialBookshelf()
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={this.state}
            updateMethod={this.getAllBooks.bind(this)} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  shelfTitle="Currently Reading"
                  books={this.state.currentBooks}
                  updateMethod={this.getAllBooks.bind(this)} />
                <Bookshelf
                  shelfTitle="Want to Read"
                  books={this.state.futureBooks}
                  updateMethod={this.getAllBooks.bind(this)} />
                <Bookshelf
                  shelfTitle="Read"
                  books={this.state.readBooks}
                  updateMethod={this.getAllBooks.bind(this)} />
              </div>
            </div>
            <div className="open-search">
              <Link to={{ pathname: "/search" }}>Add a Book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp