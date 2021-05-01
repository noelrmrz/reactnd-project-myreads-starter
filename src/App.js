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

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ 
           readBooks: books.filter(book => book.shelf === 'read'),
           currentBooks: books.filter(book => book.shelf === 'currentlyReading'),
           futureBooks: books.filter(book => book.shelf === 'wantToRead')
        }))
      })
  }


  render() {
    return (
      <div className="app">
        <Search />
        <Route exact path='/' render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                shelfTitle="Currently Reading" 
                books={this.state.currentBooks} />
              <Bookshelf 
                shelfTitle="Want to Read"
                books={this.state.futureBooks} />
              <Bookshelf
                shelfTitle="Read"
                books={this.state.readBooks} />
            </div>
          </div>
          <div className="open-search">
            <Link
              to="/search">Add a Book</Link>
          </div>
        </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
