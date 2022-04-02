import React from 'react'
import { Link } from 'react-router-dom'

function Cart(props) {
  console.log(props.cart)

  const Discount = props.cart.item && props.cart.item.discountprice ? props.cart.item.price.match(/[0-9]+/g) - props.cart.item.discountprice.match(/[0-9]+/g) : ''

  const Subtotal = props.cart.item && props.cart.item.price.match(/[0-9]+/g)*1

  let Shipping = 20

  const Total = Subtotal + Shipping

  return (
    <div className='cart'>

      {props.cart ? 
      
      // if the cart is filled
      <div className='cart-filled'>

        <div className='cart-filled-items'>
          <img src={props.cart.item.image} alt='product'></img>
          <div className='cart-filled-items-info'>
            <h3>{props.cart.item.title}</h3>
            <p>Delivery by </p>

            {/* if there is a discount show it, if not show normal price */}
            {props.cart.item.discountprice ?
             <p>{props.cart.item.discountprice}</p> :
             <p>{props.cart.item.price}</p> }

          </div>
        </div>

        <div className='cart-filled-summary'>
          <h3>Order Summary</h3>
          <input placeholder='Coupon Code'></input>

          <div className='calc'>
            <p>Subtotal before discount</p>
            <p>{props.cart.item.price}</p>
          </div>
          <div className='calc'>
            <p>Discount</p>
            <p className='discount'>-${Discount}</p>
          </div>

          <hr className='calc'></hr>

          <div className='calc'>
            <p>Subtotal</p>
            <p>${Subtotal}</p>
          </div>
          <div className='calc'>
            <p>Shipping</p>
            <p>${Shipping}</p>
          </div>

          <hr className='calc'></hr>

          <div className='calc'>
            <p className='total'>Total</p>
            <p className='total'>${Total}</p>
          </div>

          <Link to={'/'}>
            <button className='checkout-btn'>Checkout</button>
          </Link>
        </div>
      </div>

      :

      // if the cart is empty
      <div className='cart-empty'>
        <img src='https://api.iconify.design/emojione/shopping-cart.svg' className="cart-logo" alt="cart"/>

        <h4>Your cart is empty!</h4>
        
        <p>Browse our categories and discover our best deals!</p>

        <Link to={'/'}>
          <button className='home-btn'>continue shopping</button>
        </Link>
      </div>
      
      }


    </div>
  )
}

export default Cart