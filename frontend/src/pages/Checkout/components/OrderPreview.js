import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import popAlert from '../../../components/popAlert'

function OrderPreview(props) {

  const navigate = useNavigate()
  const {shippingAddress, orderItems, totalPrice, shippingPrice } = props.order


  // handle placment
  async function placeOrder(event) {
    event.preventDefault()

    await axios({
      url: '/api/orders',
      method: 'POST',
      data: props.order,
      headers: {
          Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`,
        }
    })
    .then((res) => {
      console.log('Order Placed')
      popAlert('Your order has been placed', 'Enjoy your order')
      props.emptyCart()
      console.log(res.data)
      navigate('/')
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }


  return (
    <div className='order-preview'>

      <h4>Let's finish up</h4>
      <p>You are almost done.</p>

      <div className='order-preview-contact'>

        <div className='order-preview-contact-section'>
          <h5>Name</h5>
          <p>{props.userLoggedIn.name}</p>
        </div>

        <div className='order-preview-contact-section'>
          <h5>Email</h5>
          <p>{props.userLoggedIn.email}</p>
        </div>

      </div>

      <div className='order-preview-address'>

        <div className='order-preview-address-card'>
          <h4>Delivery Address</h4>
          <p>Address: {shippingAddress && shippingAddress.address}</p>
          <p>City: {shippingAddress && shippingAddress.city}</p>
          <p>Country: {shippingAddress && shippingAddress.country}</p>
          <p>Postal Code: {shippingAddress && shippingAddress.postalCode}</p>
        </div>

        <div className='order-preview-address-card'>
          <h4>Billing Address</h4>
          <p>Address: {shippingAddress && shippingAddress.address}</p>
          <p>City: {shippingAddress && shippingAddress.city}</p>
          <p>Country: {shippingAddress && shippingAddress.country}</p>
          <p>Postal Code: {shippingAddress && shippingAddress.postalCode}</p>
        </div>

      </div>
      
      <div className='order-preview-items'>

        <table className='order-preview-items-table'>

          <tbody>

            <tr>
              <th>PHOTO</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>

            {orderItems && orderItems.map(item => {
              return (
                <tr key={item.product}>
                  <td><img src={item.image} alt='product'></img></td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.qty * item.price.toFixed(2)}</td>
                </tr>
              )
            })}

          </tbody>

          <tfoot>
            <tr>
              <td colSpan= "4"></td>
              <th>${totalPrice && totalPrice.toFixed(2) - shippingPrice}</th>
            </tr>
          </tfoot>

        </table>

      </div>

      <div className='order-preview-payment'>
        <table className='order-preview-payment-table'>

          <tbody>

            <tr>
              <td>Subtotal</td>
              <td>${totalPrice && totalPrice.toFixed(2) - shippingPrice}</td>
            </tr>

            <tr>
              <td>Shipping</td>
              <td>${shippingPrice && shippingPrice.toFixed(2)}</td>
            </tr>

          </tbody>

          <tfoot>

            <tr>
              <th>Total Payment</th>
              <th>${totalPrice && totalPrice.toFixed(2)}</th>
            </tr>

          </tfoot>

        </table>
      </div>

      <div className='place-order-btn'>
        <button onClick={placeOrder}>
              Place order
        </button>
      </div>

    </div>
  )
}

export default OrderPreview