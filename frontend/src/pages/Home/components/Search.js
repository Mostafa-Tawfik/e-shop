import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useApi from '../../../hooks/useApi'

function Search() {

  const params = useParams()

  // a state to hold search queries
  const {data: resultsData, status} = useApi(`/api/products?productNum=Infinity&keyword=${params.name}`, 'GET')

  const results = resultsData && resultsData.products

  return (
    status === 'success' &&
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