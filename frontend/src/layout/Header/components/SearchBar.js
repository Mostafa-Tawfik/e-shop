// used in Header.js

import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function SearchBar() {

  // a state to hold search queries
  const [query, setQuery] = React.useState('')

  // a state to hold search queries
  const [results, setResults] = React.useState([])

  // when query filter AppData and return includes query
  React.useEffect(() => {
    query === '' ?
    setResults([]) :
    axios.get(`/api/products?productNum=Infinity&keyword=${query}`)
    .then(res => setResults(res.data.products))
  },[query])

  return (
    <div className="header-search">
      <input 
        className="header-search-bar"
        type='text'
        placeholder='What are you looking for?'
        name='query'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>

      <div className='header-search-results' onClick={()=>setQuery('')} style={query === '' ? {padding: '0'} : {padding: '1em'}}>

        {results.slice(0,4).map(r => {
        // return maximum 4 results
          return (
            <Link to={`/product/${r._id}`} key={r._id}>
              <div>
                <div>{r.name}</div>
                <p>{r.category}</p>
              </div>
            </Link>
          )
        })}
        {results.length > 4 && 
        // if there are more than 4 results go to search page
        <Link to={'/search/' + query}>
          <h4>More ...</h4>
        </Link>}
      </div>
    </div>
  )
}

export default SearchBar