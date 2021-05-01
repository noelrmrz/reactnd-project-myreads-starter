import React from 'react'
import './App.css'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

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
        <Route path='/search' render={() => (
          <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search">Close</button>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
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
