import React from 'react'
import { Link } from 'react-router-dom'

function Cart(props) {
  console.log(props)

  const subtotalBeforeDiscount = props.cart.length > 0 ? props.cart.map(i => i.price).reduce((x, y) => x + y) : ''

  const Discount = props.cart.length > 0 ? props.cart.map(i => (i.price * i.discount/100)).reduce((x, y) => x + y) : ''

  const Subtotal = subtotalBeforeDiscount - Discount

  let Shipping = 20

  const Total = Subtotal + Shipping
  
  return (
    <div className='cart'>

      {props.cart.length > 0 ? 
      
      <div className='cart-holder'>
        <div className='cart-filled'>
          {props.cart.map(c => {
            return (
              
              // if the cart is filled
              <div key={c.id} className='cart-filled-items'>
                <img src={c.image} alt='product'></img>
                <div className='cart-filled-items-info'>
                  <h3>{c.title}</h3>
                  <p>Delivery by </p>
  
                  {/* if there is a discount show it, if not show normal price */}
                  {c.discountprice ?
                  <p>${c.discountprice}</p> :
                  <p>${c.price}</p> }
  
                </div>

                <button onClick={()=> props.removeFromCart(c.id)}>
                  <img className='cart-delete' src='https://api.iconify.design/fluent/delete-16-filled.svg?color=%23fc2e20' alt='delete item'></img>
                </button>
              </div>
            )
          })}
        </div>

        <div className='cart-filled-summary'>
          <h3>Order Summary</h3>
          <input placeholder='Coupon Code'></input>

          <div className='calc'>
            <p>Subtotal before discount</p>
            <p>{subtotalBeforeDiscount}</p>
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