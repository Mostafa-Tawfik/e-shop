import React from 'react'

import OrdersList from '../../../components/OrdersList'
import useApi from '../../../hooks/useApi'

function UserOrders(props) {

  // store orders
  const {data: orders, status} = useApi('/api/orders/myorders', 'GET')

  return (
    <div className='dash-orders'>

      <h2>My Orders</h2>

      {status === 'success' && <OrdersList orders={orders} {...props}/>}

    </div>
  )
}

export default UserOrders