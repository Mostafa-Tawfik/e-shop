import React from 'react'
import { Link } from 'react-router-dom'
import AppData from '../AppData'

function SearchBar() {

  // a state to hold search queries
  const [query, setQuery] = React.useState('')

  // a state to hold search queries
  const [results, setResults] = React.useState([])

  // when query filter AppData and return includes query
  React.useEffect(() => {
    query === '' ?
    setResults([]) :
    setResults(AppData.Products.filter(p => p.title.toUpperCase().includes(query.toUpperCase())))
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

      <div className='header-search-results' onBlur={()=>setQuery('')} style={query === '' ? {padding: '0'} : {padding: '1em'}}>

        {/* return maximum 4 results */}
        {results.slice(0,4).map(r => {
          return (
            <Link to={`/product/${r.id}`} key={r.id} >
              <div>
                <div>{r.title}</div>
                <p>{r.category}</p>
              </div>
            </Link>
          )
        })}
        {/* if there are more than 4 results go to search page */}
        {results.length > 4 && 
        <Link to={'/search/' + query}>
          <h4>More ...</h4>
        </Link>}
      </div>
    </div>
  )
}

export default SearchBar