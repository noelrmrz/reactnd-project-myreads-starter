import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

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