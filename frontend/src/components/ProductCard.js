import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import popAlert from '../Helpers/popAlert'

function ProductCard(props) {

  const {content} = props

  return (

    <motion.div className='product-card'>

      <div className='discount'>
          {content.discount > 0 && <img src='https://png2.cleanpng.com/sh/d5b9d75cd8a81f00a1af6b3e11d81b73/L0KzQYm3U8I4N6N0fZH0aYP2gLBuTgNidJZ4RdlqcnHqdX76gfxmNZVui9V4dX73g37ojvQuaZ1xhAlqbnPog376iP9xeJpzReVqbHWwg8XwgBtmel46edQEZUXkRom9WcFmPV85UakDM0azR4K8UsIyO2M4UaIANUG1PsH1h5==/kisspng-sales-garage-sale-discounts-and-allowances-shoppin-sale-sticker-5ab9e5a68691e5.4978360715221323905512.png' alt='sale'></img>}
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
          <h5 className='product-newprice'>${content.price.toFixed(0) * (100 - content.discount)/100}</h5>
          <h5 className='product-oldprice'>${content.price}</h5>
        </div>
          : 
        <h5 className='product-price'>${content.price}</h5>}
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