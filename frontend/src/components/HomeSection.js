import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

import ProductCard from './ProductCard'

function HomeSection(props) {

  const [products, setProducts] = React.useState([])

  React.useEffect(()=> {
    axios.get('/api/products?productNum=Infinity')
    .then(data => setProducts(data.data.products))
  },[])

  return (
    <div className='cat-holder'>
      <Link to={`/${props.filter}`}>
        <h4>{props.filter}</h4>
      </Link>
      <div className='product-holder'>
      {products.filter(i=>i.category === props.filter).map(i => {
        return (
          <div key={i._id}>
            <ProductCard content={i} {...props}/>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default HomeSection