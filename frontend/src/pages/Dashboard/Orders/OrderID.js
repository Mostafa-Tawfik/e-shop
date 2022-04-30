import React from 'react'
import { useParams } from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react'

import OrderDetails from '../../../components/OrderDetails'
import useApi from '../../../hooks/useApi'
import popAlert from '../../../Helpers/popAlert'

function OrderID() {
  
  const params = useParams()

  // fetch order by id
  const {status, data, error} = useApi(`/api/orders/${params.id}`, 'GET')

  if(error) {
    popAlert('Somthing went wrong', 'error')
  }

  return (
    
    <div className='dash-order-id'>

      {status === 'loading' && <SpinnerDotted />}
      {status === 'success' && <OrderDetails order={data}/>
    }
    </div>
  )
}

export default OrderID