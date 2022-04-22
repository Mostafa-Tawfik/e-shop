import React from 'react'
import { Link, useParams } from 'react-router-dom'
import AppData from '../../../AppData'

function Search(props) {

  const params = useParams()

  console.log(params.name)

  // a state to hold search queries
  const [results, setResults] = React.useState([])

  console.log(results)

  React.useEffect(() => {
    setResults(AppData.Products.filter(p => p.title.toUpperCase().includes(params.name.toUpperCase())))
  },[params.name])

  return (
    <div className='search'>
      <h5>{results.length} Results for"{params.name}"</h5>
      <section className='search-card-holder'>
        {results.map(p => {
          return (
          <div key={p.id} className='search-card'>
            <Link to={`/product/${p.id}`}>
              <img src={p.image} alt="product"></img>
            </Link>

            <div className='search-card-info'>

              <p>{p.category}</p>

              <Link to={`/product/${p.id}`}>
                <h5>{p.title}</h5>
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