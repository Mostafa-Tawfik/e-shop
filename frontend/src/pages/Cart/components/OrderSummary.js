// used in Cart.js

import React from 'react'
import { Link } from 'react-router-dom'
import AppData from '../../../AppData'

function OrderSummary(props) {

  // a state to hold coupon input
  const [coupon, setCoupon] = React.useState('')


  // a state to confirm the coupon validation
  const [couponIsvalid, setCouponIsvalid] = React.useState('')

  // compare coupon with database
  React.useEffect(()=> {
    setCouponIsvalid(AppData.coupons.filter(c => c.code === coupon).map(c => c.save))
  },[coupon])


  // Order Summary calc
  const subtotalBeforeDiscount = props.cart.length > 0 ? props.cart.map(i => i.price).reduce((x, y) => x + y) : ''

  const discount = props.cart.length > 0 ? props.cart.map(i => (i.price * i.discount/100)).reduce((x, y) => x + y) : ''

  const couponDiscount = (subtotalBeforeDiscount - (discount &&  discount)) * couponIsvalid/100

  const subtotal = subtotalBeforeDiscount - discount - (couponDiscount &&  couponDiscount)

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
        <p>${subtotalBeforeDiscount}</p>
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

      <Link to={'/checkout'}>
        <button className='checkout-btn'>Checkout</button>
      </Link>
    </div>
  )
}

export default OrderSummary