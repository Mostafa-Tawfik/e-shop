import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../../context/Auth-context'
import { CartContext } from '../../../../context/Cart-context'
import { OrderContext } from '../../../../context/Order-context'
import apiCrud from '../../../../Helpers/apiCrud'


function OrderPreview() {

  const navigate = useNavigate()

  const {userName, userEmail}= useContext(AuthContext)
  const {emptyCart} = useContext(CartContext)
  const order = useContext(OrderContext).order

  // destrcture sections form the order
  const {shippingAddress, orderItems, totalPrice, shippingPrice } = order

  // handle placment
  async function placeOrder(event) {
    event.preventDefault()
    apiCrud('/api/orders', 'POST', 'Enjoy your order', order, 
    ()=> {return emptyCart(), navigate('/')})
  }

  return (
    <div className='order-preview'>

      <h4>Let's finish up</h4>
      <p>You are almost done.</p>

      <div className='order-preview-contact'>

        <div className='order-preview-contact-section'>
          <h5>Name</h5>
          <p>{userName}</p>
        </div>

        <div className='order-preview-contact-section'>
          <h5>Email</h5>
          <p>{userEmail}</p>
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
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>${Number(item.qty * item.price).toFixed(2)}</td>
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
              <td>${totalPrice && Number(totalPrice).toFixed(2) - shippingPrice}</td>
            </tr>

            <tr>
              <td>Shipping</td>
              <td>${shippingPrice && shippingPrice.toFixed(2)}</td>
            </tr>

          </tbody>

          <tfoot>

            <tr>
              <th>Total Payment</th>
              <th>${totalPrice && Number(totalPrice).toFixed(2)}</th>
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