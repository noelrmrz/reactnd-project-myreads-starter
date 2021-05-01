import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

    state = {
        query: '',
        results: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }), () => this.finder(query))

/*         BooksAPI.search(query)
        .then((data) => {
          this.setState(function(currentState, props) {
            if (typeof data === 'undefined') {
                console.log("UNDEFINED")
                return { results: [] }
            } else {
                console.log(data)
                return { results: data }
            } 
        })
    }) */
    }

    finder=(query)=>{
        BooksAPI.search(query)
        .then((responses)=>{
          console.log("responses",responses)
          if(typeof responses !== 'undefined' || responses.error !== 'empty query' ){
            this.setState(()=>({
              results:[...responses]
            }))
          }
          else{
            this.setState(()=>({
              // when there is no book results
              results:[] 
            }))
          }
        })
      }

    componentDidMount() {

    }

    render() {
        return(
            <Route path='/search' render={() => (
                <div className="search-books">
                <div className="search-books-bar">
                  <Link 
                    className="close-search"
                    to='/'>Close</Link>
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
                    <Book books={this.state.results} />
                </div>
              </div>
              )} />
        )
    }
}

export default Search