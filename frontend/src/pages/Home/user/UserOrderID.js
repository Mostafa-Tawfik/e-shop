import React from 'react'
import { useParams } from 'react-router-dom'

import OrderDetails from '../../../components/OrderDetails'
import useApi from '../../../hooks/useApi'

function UserOrderID() {

  const params = useParams()

  // store orders
  const {data: order} = useApi(`/api/orders/${params.id}`, 'GET')

  return (
    
    <div className='dash-order-id'>

    {order && 
      <OrderDetails order={order}/>
    }
    </div>
  )
}

export default UserOrderID