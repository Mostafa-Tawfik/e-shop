import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import OrderDetails from '../../../../components/OrderDetails'

function OrderID() {
  
  const params = useParams()

  // store orders
  const [order, setOrder] = useState('')
  console.log('order', order)

  // fetch all orders
  useEffect(()=> {
    axios.get(`/api/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
     }
    })
    .then(data => setOrder(data.data))
  },[])

  return (
    
    <div className='dash-order-id'>

    {order && 
      <OrderDetails order={order}/>
    }
    </div>
  )
}

export default OrderID