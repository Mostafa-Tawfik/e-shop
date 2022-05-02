import axios from 'axios'
import React, { useEffect, useState } from 'react'

import OrdersList from '../../../components/OrdersList'

function UserOrders(props) {

  // store orders
  const [orders, setOrders] = useState('')
  // console.log('orders', orders)

  // fetch all orders
  useEffect(()=> {
    axios.get('/api/orders/myorders', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
    .then(data => setOrders(data.data))
  },[])


  return (
    <div className='dash-orders'>

      <h2>My Orders</h2>

      <OrdersList orders={orders} {...props}/>

    </div>
  )
}

export default UserOrders