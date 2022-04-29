import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { SpinnerDotted } from 'spinners-react'

import ProductCard from './ProductCard'

const fetchProducts = async () => {
  const res = await axios.get('/api/products?productNum=Infinity')
  return res
}

function HomeSection(props) {

  const {data, status} = useQuery('products', fetchProducts)
  // console.log(data);
  console.log(status);

  return (
    <div className='cat-holder'>
      <Link to={`/${props.filter}`}>
        <h4>{props.filter}</h4>
      </Link>
      <div className='product-holder'>
      {status === 'loading' && <SpinnerDotted />}
      {status === 'success' && data.data.products.filter(i=>i.category === props.filter).map(i => {
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