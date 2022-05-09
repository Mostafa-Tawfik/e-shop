import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SpinnerDotted } from 'spinners-react'
import ProductCard from './ProductCard';
import useProducts from '../../../hooks/useProducts'
import FlashSaleCard from './FlashSaleCard';


function Homepage() {

  // auto start top page
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  const {status, data: products} = useProducts()

  const categories = status === 'success' && [...new Set(products.map(p => p.category))]

  const pageMotion= {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, x: 0, transition: { duration: 1 } }
  }

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageMotion}
    >
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
                    <ProductCard content={i}/>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      ))}
      
    </motion.div>
  )
}

export default Homepage