import React from 'react'
import { Link } from 'react-router-dom';

import { SpinnerDotted } from 'spinners-react'
import ProductCard from '../../../components/ProductCard';
import useGetProducts from '../../../hooks/useGetProducts'


function Homepage(props) {

  const {status, data: products} = useGetProducts()

  const categories = status === 'success' && [...new Set(products.map(p => p.category))]

  return (
    <div>
      <img src='../images/Free-Advertising-Ideas.jpg' alt='ad' className='ad-image'></img>

      {status === 'success' && categories.map((c,i) => (
        <div key={i}>
          <div className='cat-holder'>

            <Link to={`/${c}`}>
              <h4>{c}</h4>
            </Link>

            <div className='product-holder'>
              {status === 'loading' && <SpinnerDotted />}
              {status === 'success' && products.filter(i=>i.category === c).map(i => {
                return (
                  <div key={i._id}>
                    <ProductCard content={i} {...props}/>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      ))}
      
    </div>
  )
}

export default Homepage