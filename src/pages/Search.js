import React from 'react'
import { Link, useParams } from 'react-router-dom'
import AppData from '../AppData'

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

              <div className='search-card-info-left'>
                <p>{p.category}</p>
                <Link to={`/product/${p.id}`}>
                  <h5>{p.title}</h5>
                </Link>
              </div>

              <div className='search-card-info-right'>
                <h5 className='search-card-price'>${p.price}</h5>

                {/* onclick add to cart */}
                <button onClick={()=> {
                  props.cart.length > 0 &&
                  props.cart.map(c => c.id).includes(p.id) ?
                  alert("Product already in your cart") :
                  props.addToCart(p)
                }}>
                  <img src={`https://api.iconify.design/bi/${props.cart && props.cart.map(c => c.id).includes(p.id) ? 'cart-check-fill.svg?color=green':'cart-plus-fill.svg?color=%23073c81'}`} alt='add-to-cart'></img>
                </button>
              </div>
            </div>
            
          </div>
          )
        })}      
      </section>
    </div>
  )
}

export default Search