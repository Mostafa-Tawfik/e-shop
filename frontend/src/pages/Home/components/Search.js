import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Search() {

  const params = useParams()

  console.log(params.name)

  // a state to hold search queries
  const [results, setResults] = React.useState([])

  React.useEffect(() => {
    params.name === '' ?
    setResults([]) :
    axios.get(`/api/products?productNum=Infinity&keyword=${params.name}`)
    .then(res => setResults(res.data.products))
  },[params])

  return (
    <div className='search'>
      <h5>{results.length} Results for"{params.name}"</h5>
      <section className='search-card-holder'>
        {results.map(p => {
          return (
          <div key={p._id} className='search-card'>
            <Link to={`/product/${p._id}`}>
              <img src={p.image} alt="product"></img>
            </Link>

            <div className='search-card-info'>

              <p>{p.category}</p>

              <Link to={`/product/${p.id}`}>
                <h5>{p.name}</h5>
              </Link>

              <p>${p.price}</p>

            </div>
            
          </div>
          )
        })}      
      </section>
    </div>
  )
}

export default Search