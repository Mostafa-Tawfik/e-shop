import axios from 'axios'
import React, { useEffect, useState } from 'react'

import OrdersList from '../../../components/OrdersList'

function Orders(props) {

  // store orders
  const {orders} = props
  
 


  return (
    <div className='dash-orders'>

      <h2>Orders</h2>

      <OrdersList orders={orders} {...props}/>

    </div>
  )
}

export default Orders