import React from 'react'
import { Link } from 'react-router-dom'

function Cart() {
  return (
    <div className='cart'>

      <img src='https://api.iconify.design/emojione/shopping-cart.svg' className="cart-logo" alt="cart"/>

      <h4>Your cart is empty!</h4>
      
      <p>Browse our categories and discover our best deals!</p>

      <Link to={'/'}>
        <button className='home-btn'>continue shopping</button>
      </Link>
    </div>
  )
}

export default Cart