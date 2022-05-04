import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import popAlert from '../../../Helpers/popAlert'

function ProductCard(props) {

  const {content} = props

  return (

    <motion.div className='product-card'>

      <div className='discount'>
          {content.discount > 0 && <img src='https://api.iconify.design/foundation/burst-sale.svg?color=%23fc2e20' alt='sale'></img>}
      </div>

      <Link to={`/product/${content._id}`}>
        <img src={content.image} alt='product' className='product-img'></img>
      </Link>

      <div className='product-info'>

        <p className='product-category'>{content.category}</p>

        <Link to={`/product/${content._id}`}>
          <h4 className='product-title'>{content.name}</h4>
        </Link>
      
        {content.discount ? 
        <div className='product-price-com'>
          <h5 className='product-newprice'>${Number(content.price * (100 - content.discount)/100).toFixed(2)}</h5>
          <h5 className='product-oldprice'>${Number(content.price).toFixed(2)}</h5>
        </div>
          : 
        <h5 className='product-price'>${Number(content.price).toFixed(2)}</h5>}
      </div>
      
      {/* onclick add to cart */}
      <button onClick={()=> {
        props.cart.length > 0 &&
        props.cart.map(c => c._id).includes(content._id) ?
        popAlert('Product already in your cart', 'info') :
        props.addToCart(content)
      }}>
        <img src={`https://api.iconify.design/bi/${props.cart && props.cart.map(c => c._id).includes(content._id) ? 'cart-check-fill.svg?color=green':'cart-plus-fill.svg?color=%23073c81'}`} alt='add-to-cart'></img>
      </button>
      
    </motion.div>
  )
}

export default ProductCard