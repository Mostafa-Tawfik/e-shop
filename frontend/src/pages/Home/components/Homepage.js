import React from 'react'
import { Link } from 'react-router-dom';

import { SpinnerDotted } from 'spinners-react'
import ProductCard from './ProductCard';
import useProducts from '../../../hooks/useProducts'
import FlashSaleCard from './FlashSaleCard';


function Homepage(props) {

  const {status, data: products} = useProducts()

  const categories = status === 'success' && [...new Set(products.map(p => p.category))]

  return (
    <div>
      <img src='../images/Free-Advertising-Ideas.jpg' alt='ad' className='ad-image'></img>

      {products && 
      <section className='flash'>
        <h2>Flash Sale</h2>
        <article className='flash-holder'>
          <FlashSaleCard content={products[2]}/>
          <FlashSaleCard content={products[11]}/>
        </article>
      </section>
      }

      {status === 'success' && categories.map((c,i) => (
        <div key={i}>
          <div className='cat-holder'>

            <Link to={`/${c}`}>
              <h3>{c}</h3>
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