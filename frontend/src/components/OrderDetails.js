import React from 'react'
import { Link } from 'react-router-dom'

function OrderDetails(props) {

  return (
    <div className='order-details'>
      <h2>Order</h2>
      
      <h5>Number: #{props.order._id}</h5>
      <h5>Date: {props.order.createdAt.substr(0,10)}</h5>
      <h5>Payment method: {props.order.paymentMethod ? 'Cash on delivery' : 'Credit/Debit'}</h5>
      <h5>Payment status: {props.order.isPaid ? 'Paid' : 'Cash on delivery'}</h5>
      <h5>Delivery status: {props.order.isDelivered ? 'Delivered' : 'Processing'}</h5>

      <div className='order-details-contact'>

        <div className='order-details-contact-section'>
          <h5>Name</h5>
          <p>{props.order.user.name}</p>
        </div>

        <div className='order-details-contact-section'>
          <h5>Email</h5>
          <p>{props.order.user.email}</p>
        </div>

      </div>

      <div className='order-details-address'>

        <div className='order-details-address-card'>
          <h4>Delivery Address</h4>
          <p>Address: {props.order.shippingAddress && props.order.shippingAddress.address}</p>
          <p>City: {props.order.shippingAddress && props.order.shippingAddress.city}</p>
          <p>Country: {props.order.shippingAddress && props.order.shippingAddress.country}</p>
          <p>Postal Code: {props.order.shippingAddress && props.order.shippingAddress.postalCode}</p>
        </div>

        <div className='order-details-address-card'>
          <h4>Billing Address</h4>
          <p>Address: {props.order.shippingAddress && props.order.shippingAddress.address}</p>
          <p>City: {props.order.shippingAddress && props.order.shippingAddress.city}</p>
          <p>Country: {props.order.shippingAddress && props.order.shippingAddress.country}</p>
          <p>Postal Code: {props.order.shippingAddress && props.order.shippingAddress.postalCode}</p>
        </div>

      </div>
      
      <div className='order-details-items'>

        <table className='order-details-items-table'>

          <tbody>

            <tr>
              <th>PHOTO</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>

            {props.order.orderItems && props.order.orderItems.map(item => {
              return (
                <tr key={item.product}>

                  <td>
                    <Link to={`/product/${item.product}`}>
                      <img src={item.image} alt='product'></img>
                    </Link>
                  </td>
                  
                  <td>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  
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
              <th>${props.order.totalPrice && props.order.totalPrice.toFixed(2) - props.order.shippingPrice}</th>
            </tr>
          </tfoot>

        </table>

      </div>

      <div className='order-details-payment'>
        <table className='order-details-payment-table'>

          <tbody>

            <tr>
              <td>Subtotal</td>
              <td>${props.order.totalPrice && props.order.totalPrice.toFixed(2) - props.order.shippingPrice}</td>
            </tr>

            <tr>
              <td>Shipping</td>
              <td>${props.order.shippingPrice && props.order.shippingPrice.toFixed(2)}</td>
            </tr>

          </tbody>

          <tfoot>

            <tr>
              <th>Total Payment</th>
              <th>${props.order.totalPrice && props.order.totalPrice.toFixed(2)}</th>
            </tr>

          </tfoot>

        </table>
      </div>

    </div>
  )
}

export default OrderDetails