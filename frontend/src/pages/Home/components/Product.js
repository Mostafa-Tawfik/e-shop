import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';

import popAlert from '../../../Helpers/popAlert'
import Ratings from 'react-ratings-declarative'
import useApi from '../../../hooks/useApi'
import { CartContext } from '../../../context/Cart-context'

function Product() {
  
  const params = useParams()

  const cart = useContext(CartContext).cart
  const addToCart = useContext(CartContext).addToCart

  // auto start top page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {data: product, status} = useApi(`/api/products/${params.id}`, 'GET')

  // control active info section
  const [activeInfo, SetActiveInfo] = useState('desc')

  function switchActiveInfo(target) {
    SetActiveInfo(target)
  }


  // calc average of reviews
  const average = 
  product && product.reviews.length > 0 ? 
  product.reviews.map(r => r.rating).reduce((x, y) => x + y)/product.reviews.length
  : ''

  const pageMotion= {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, x: 0, transition: { duration: 1 } }
  }

  return (
    status === 'success' && 
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageMotion}
      className='product'
    >
      <div className='product-holder'>
        <img src={product.image} alt='product'></img>
        <div className='product-info'>
          <p>{product.category}</p>
          <p>{product.subCategory}</p>
          <h2>{product.name}</h2>
          <p>Brand: {product.brand}</p>
          <p>Stock: {product.countInStock ? product.countInStock : <span style={{color: 'red'}}>"Out of stock"</span>}</p>
          
          <div>
            {product.discount > 0 ? 
            // if price have a discount
            <div className='product-price-holder'>
              <h5 className='product-price'>${Number(product.price * ((100 - product.discount)/100)).toFixed(2)}</h5>
              <div className='product-price-savings'>
                <h5>Save ${Number(product.price * product.discount/100).toFixed(2)}</h5>
                <p>All prices include VAT.</p>
              </div>
            </div> : 
            // // if price dosen't have a discount
            <div className='product-price-holder'>
              <h5 className='product-price'>
                ${Number(product.price).toFixed(2)}
              </h5>
            </div>}
          </div>
          

          {product.description && <p className='product-info-desc'>{product.description}</p>}

          <hr></hr>


          {/* onclick add to cart */}
          <button onClick={()=> {
            // check if the item is already in the cart
              cart.length > 0 &&
              cart.map(c => c._id).includes(product._id) ?
              popAlert('Product already in your cart', 'info') :
              addToCart(product)
            }}>
              {/* if product is on the cart show "added" */}
              {cart && cart.map(c => c._id).includes(product._id) ? 
              <p>Added</p> :
              <p>Add to cart</p>}
              
            </button>

          {product.discount > 0 && <h2 className='product-discount'>{product.discount}%</h2>}
        </div>
      </div>

      <section className='product-more-info'>

        <div className='product-more-info-header'>

          <h4 
          onClick={()=>switchActiveInfo('desc')}
          style={activeInfo === 'desc' ? 
          {background: '#0948a5', color: 'white'} : 
          {background: ''} }       
          >
            Description
          </h4>

          <h4 
          onClick={()=>switchActiveInfo('reviews')}
          style={activeInfo === 'reviews' ? 
          {background: '#0948a5', color: 'white'} : 
          {background: ''} } 
          >
            Reviews
          </h4>

        </div>

        <div className={`product-more-info-desc ${(activeInfo === `desc`) && `active`}`}>
          <div className="module">
            <h4>Lorem ipsum dolor sit amet.</h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam cupiditate nihil veniam ipsam voluptatem odit dolorum, ratione vel est repellendus.</p>
          </div>
          <div className="module">
            <h4>Commodi facilis earum facere nam.</h4>
            <p>At corrupti officia quaerat maxime, maiores molestias animi laborum aliquam, tempore tempora recusandae vel dolores repellat non quam harum dignissimos?</p>
          </div>
          <div className="module">
            <h4>Asperiores necessitatibus provident enim fugiat.</h4>
            <p>Perspiciatis non provident, sunt quas sed rerum in, animi quidem, a saepe aperiam molestiae quod rem distinctio accusamus corporis adipisci.</p>
          </div>
        </div>

        <div className={`product-more-info-reviews ${(activeInfo === `reviews`) && `active`}`}>

        <div className='product-more-info-reviews-average'>
          <h4>{average && average.toFixed(1)}</h4>

          {average && <Ratings
            rating={average}
            widgetDimensions="20px"
            widgetSpacings="0px"
            widgetRatedColors="gold"
            widgetHoverColors="gold"            
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>}

        </div>

        {product.reviews && product.reviews.map(review => (

          <div 
          key={review._id} 
          className='product-more-info-reviews-card'>

            <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt='user'>
            </img>

            <div>
              <h4>{review.name}</h4>

              <Ratings
                rating={review.rating*1}
                widgetDimensions="20px"
                widgetSpacings="0px"
                widgetRatedColors="gold"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>

              <p>{review.comment}</p>
            </div>

          </div>
        ))}

        </div>
        
      </section>

    </motion.div>
  )
}

export default Product