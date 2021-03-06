// used in Cart.js

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppData from '../../../AppData'
import { AuthContext } from '../../../context/Auth-context'
import { CartContext } from '../../../context/Cart-context'
import { OrderContext } from '../../../context/Order-context'

function OrderSummary() {

  const {cart} = useContext(CartContext)
  const {generateOrder} = useContext(OrderContext)
  const {userId} = useContext(AuthContext)

  // a state to hold coupon input
  const [coupon, setCoupon] = React.useState('')


  // a state to confirm the coupon validation
  const [couponIsvalid, setCouponIsvalid] = React.useState('')

  // compare coupon with database
  React.useEffect(()=> {
    setCouponIsvalid(AppData.coupons.filter(c => c.code === coupon).map(c => c.save))
  },[coupon])


  // Order Summary calc
  const subtotalBeforeDiscount = 
  cart.length > 0 ? 
  cart.map(i => i.qty ? i.price * i.qty : i.price).reduce((x, y) => x + y) 
  : 
  ''

  const discount = 
  cart.length > 0 ? 
  cart.map(i => ((i.qty ? i.price * i.qty : i.price) * i.discount/100)).reduce((x, y) => x + y) 
  : 
  ''

  const couponDiscount = 
  (subtotalBeforeDiscount - (discount && discount)) * couponIsvalid/100

  const subtotal = 
  subtotalBeforeDiscount - discount - (couponDiscount && couponDiscount)

  let shipping = 20

  const Total = subtotal + shipping
  

  return (
    <div className='cart-filled-summary'>
      <h3>Have A Coupon?</h3>
      <input 
        placeholder='Coupon Code'
        type='text'
        value={coupon}
        name='coupon'
        onChange={(e)=> setCoupon(e.target.value)}
      ></input>
      {couponIsvalid[0] && <p>Coupon is applied</p>}

      <h3>Order Summary</h3>

      <div className='calc'>
        <p>Subtotal</p>
        <p>${subtotalBeforeDiscount.toFixed(2)}</p>
      </div>
      {discount !== 0 && <div className='calc'>
        <p>Discount</p>
        <p className='discount'>-${discount.toFixed(2)}</p>
      </div>}

      {couponDiscount !== 0 && <div className='calc'>
        <p>Coupon</p>
        <p className='discount'>-${couponDiscount.toFixed(2)}</p>
      </div>}

      <hr className='calc'></hr>

      <div className='calc'>
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>


      <div className='calc'>
        <p>Shipping</p>
        <p>${shipping.toFixed(2)}</p>
      </div>

      <hr className='calc'></hr>

      <div className='calc'>
        <p className='total'>Total</p>
        <p className='total'>${Total.toFixed(2)}</p>
      </div>

      {userId ?
        /* if user logged in go to checkout if not go to login */ 
        <Link to={'/checkout'}>
          <button onClick={generateOrder} className='checkout-btn'>Checkout</button>
        </Link>
      :
        <Link to={'/login'}>
          <button className='checkout-btn'>Checkout</button>
        </Link>              
      }
    </div>
  )
}

export default OrderSummary