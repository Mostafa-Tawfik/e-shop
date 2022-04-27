import axios from 'axios'
import React, { useEffect, useState } from 'react'

import OrdersList from '../../../components/OrdersList'

function Orders(props) {

  // store orders
  const [orders, setOrders] = useState('')


  console.log(orders)

  // fetch all orders
  useEffect(()=> {
    axios.get('/api/orders/', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setOrders(data.data.slice(0).reverse()))
  },[]) 


  return (
    <div className='dash-orders'>

      <h2>Orders</h2>

      <OrdersList orders={orders} {...props}/>

    </div>
  )
}

export default Orders