import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import changeToDelivered from '../../../../components/changeToDelivered'
import changeToPaid from '../../../../components/changeToPaid'

function Orders() {

  // store orders
  const [orders, setOrders] = useState('')
  console.log('orders', orders)

  // fetch all orders
  useEffect(()=> {
    axios.get('/api/orders/', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setOrders(data.data))
  },[])


   // control more btn
   const [isOpen, setIsOpen] = useState({
    open: false,
    id: ''
  })

  // toggle more btn
  function toggleMoreBtn(id) {
    setIsOpen(prev => {
      return {
        ...prev,
        open: !isOpen.open,
        id: id
      }
      })
  }


  // handle actions btn
  function actions(id) {
    return (
      <div className='dash-orders-actions-holder'>
        <button 
        // toggle more btn
        onClick={()=>toggleMoreBtn(id)} 
        className='dash-orders-action-btn'>
          <img src='https://api.iconify.design/akar-icons/more-horizontal-fill.svg' alt='more'></img>
        </button>

        {
        // if target btn clicked toggle
        isOpen.id === id && 
        isOpen.open && 
        <div className='dash-orders-actions'>

          <p onClick={()=>changeToDelivered(id)}>Change to delivered</p>

          <p onClick={()=>changeToPaid(id)}>Change to paid</p>

        </div>
        }
      </div>

    )
  } 

  return (
    <div className='dash-orders'>

      <h2>Orders</h2>

      <div className='dash-orders-items'>

        <table className='dash-orders-items-table'>

          <tbody>

            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>Delivery</th>
              <th>Payment</th>
              <th>ACTIONS</th>
            </tr>

            {orders[0] && orders.map(order => {
              return (
                <tr key={order._id}>
                  <td><Link to={`/dashboard/orders/${order._id}`}>#{order._id}</Link></td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substr(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{order.isDelivered ? <p style={{color: 'green', fontWeight: 'bolder'}}>Delivered</p> : 'Processing'}</td>
                  <td>{order.isPaid ? <p style={{color: 'green', fontWeight: 'bolder'}}>Paid</p> : 'Cash on delivery'}</td>
                  <td>{actions(order._id)}</td>
                </tr>
              )
            })}

          </tbody>

        </table>    

      </div>

    </div>
  )
}

export default Orders