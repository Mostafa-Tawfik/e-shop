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

          <thead>
            <tr>
              <th>PHOTO</th>
              <th>NAME</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>

          <tbody>

            {props.order.orderItems && props.order.orderItems.map(item => {
              return (
                <tr key={item.product}>

                  <td data-label="PHOTO">
                    <Link to={`/product/${item.product}`}>
                      <img src={item.image} alt='product'></img>
                    </Link>
                  </td>
                  
                  <td data-label="NAME">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  
                  <td data-label="QUANTITY">{item.qty}</td>
                  <td data-label="PRICE">${Number(item.price).toFixed(2)}</td>
                  <td data-label="TOTAL">${Number(item.qty * item.price).toFixed(2)}</td>
                </tr>
              )
            })}

          </tbody>

          <tfoot>
            <tr>
              <th colSpan= "4">TOTAL</th>
              <td data-label="Subtotal">${props.order.totalPrice && Number(props.order.totalPrice - props.order.shippingPrice).toFixed(2)}</td>
            </tr>
          </tfoot>

        </table>

      </div>

      <div className='order-details-payment'>
        <table>

          <tfoot>

            <tr>
              <th>Subtotal</th>
              <td data-label="Subtotal">${props.order.totalPrice && Number(props.order.totalPrice - props.order.shippingPrice).toFixed(2)}</td>
            </tr>

            <tr>
              <th>Shipping</th>
              <td data-label="Shipping">${props.order.shippingPrice && Number(props.order.shippingPrice).toFixed(2)}</td>
            </tr>

            <tr>
              <th>Total Payment</th>
              <td data-label="Grand TOTAL">${props.order.totalPrice && Number(props.order.totalPrice).toFixed(2)}</td>
            </tr>

          </tfoot>

        </table>
      </div>

    </div>
  )
}

export default OrderDetails