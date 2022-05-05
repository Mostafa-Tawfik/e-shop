import React from 'react'

import OrdersList from '../../../components/OrdersList'
import useApi from '../../../hooks/useApi'
import { SpinnerDotted } from 'spinners-react'
import popAlert from '../../../Helpers/popAlert'

function Orders() {

  // fetch orders
  const {status, data, error} = useApi('/api/orders', 'GET')

  const orders = data && data.slice(0).reverse()

  if(error) {
    popAlert('Somthing went wrong', 'error')
  }


  return (
    <div className='dash-orders'>

      <h2>Orders</h2>

      {status === 'loading' && <SpinnerDotted />}
      {status === 'success' && <OrdersList orders={orders}/>}      

    </div>
  )
}

export default Orders