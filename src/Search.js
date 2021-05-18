import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
    // update books here witht the list passed in
    state = {
        query: '',
        results: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }), () => this.getBooksFromSearch(query))
    }

    getBooksFromSearch = (query) => {
        BooksAPI.search(query)
            .then((responses) => {
                if (typeof responses !== 'undefined' && responses.error !== 'empty query') {

                    // we have to check if each book is currently in a shelf since the search
                    // results default to none. If it exists we add the shelf key and respective
                    // value
                    responses.forEach(book => {
                        this.checkIfInShelf(book)
                    });

                    this.setState(() => ({
                        results: [...responses]
                    }))
                }
                else {
                    this.setState(() => ({
                        // when there is no book results
                        results: []
                    }))
                }
            })
    }

    checkIfInShelf(searchBook) {
        this.props.books.readBooks.forEach(readBook => {
            if (readBook.id === searchBook.id) {
                BooksAPI.update(searchBook, 'read')
                searchBook.shelf = 'read'
                return searchBook
            }
        })

        this.props.books.currentBooks.forEach(currentBook => {
            if (currentBook.id === searchBook.id) {
                BooksAPI.update(searchBook, 'currentlyReading')
                searchBook.shelf = 'currentlyReading'
                return searchBook
            }
        })

        this.props.books.futureBooks.forEach(futureBook => {
            if (futureBook.id === searchBook.id) {
                BooksAPI.update(searchBook, 'wantToRead')
                searchBook.shelf = 'wantToRead'
                return searchBook
            }
        })

        return searchBook
    }

    render() {


        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <Book books={this.state.results} updateMethod={this.props.updateMethod} />
                </div>
            </div>

        )
    }
}

export default Search