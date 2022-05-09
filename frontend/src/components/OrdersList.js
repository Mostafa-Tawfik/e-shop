import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

import { AuthContext } from '../context/Auth-context'
import apiCrud from '../Helpers/apiCrud'
import popAction from '../Helpers/popAction';


function OrdersList(props) {

  const navigate = useNavigate()
  const {isAdmin} = useContext(AuthContext)

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

  function changeToDelivered(id) {
    apiCrud(`/api/orders/${id}/deliver`, 'PUT', 'Status updated')
  }

  function changeToPaid(id) {
    apiCrud(`/api/orders/${id}/pay`, 'PUT', 'Status updated')
  }

  // handle actions btn
  function actions(id) {
    return (
      <div className='orders-list-actions-holder'>
        <button 
        // toggle more btn
        onClick={()=>toggleMoreBtn(id)} 
        className='orders-list-action-btn'>
          <img src='https://api.iconify.design/akar-icons/more-horizontal-fill.svg' alt='more'></img>
        </button>

        {
        // if target btn clicked toggle
        isOpen.id === id && 
        isOpen.open && 
        
        <div className='orders-list-actions'>

          <p onClick={()=>changeToDelivered(id)}>Change to delivered</p>

          <p onClick={()=>changeToPaid(id)}>Change to paid</p>

          </div>
        }
      </div>

    )
  } 


  function cancelOrder(id) {
    return (
      <button 
      onClick={()=>popAction('Are you sure?', 
      "You won't be able to revert this!",
      'Yes, cancel it!',
      ()=>apiCrud(`/api/orders/${id}` ,'DELETE' ,'Order canceled')())}
      className='orders-list-items-table-delete'
      >
        Cancel
      </button>
    )
  }

  function reviewOrder(id) {
    return (
      <button 
      onClick={()=>navigate(`/user/review/${id}`)}
      className='orders-list-items-table-review'
      >
        Review
      </button>
    )
  }

  function date(date) {
    const display = new Date(date)
    return <p>{display.toLocaleDateString('en-GB')}</p>;
  } 

  const pageMotion= {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, transition: { duration: 0.5 } }
  }
  
  return (
    <motion.main 
    initial='initial'
    animate='animate'
    exit='exit'
    variants={pageMotion} 
    className='orders-list-items'>

      <table className='orders-list-items-table'>

        <thead>
          <tr>
            <th>Order ID</th>
            {isAdmin && <th>NAME</th>}
            <th>DATE</th>
            <th>TOTAL</th>
            <th>Delivery</th>
            <th>Payment</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>

          {props.orders[0] && props.orders.map(order => {
            return (
              <tr key={order._id}>

                {/* if admin go to admin order route */}
                <td data-label="Order ID"><Link to={`/${isAdmin ? '' : 'user/'}orders/${order._id}`}>#{order._id}</Link></td>

                {isAdmin && <td data-label="Name">{order.user.name}</td>}

                <td data-label="Date">{date(order.createdAt)}</td>

                <td data-label="Total">${order.totalPrice.toFixed(2)}</td>

                <td data-label="Delivery">
                  {order.isDelivered ? <p style={{color: 'green', fontWeight: 'bolder'}}>Delivered</p> : 'Processing'}
                </td>

                <td data-label="Payment">
                  {order.isPaid ? <p style={{color: 'green', fontWeight: 'bolder'}}>Paid</p> : 'Cash on delivery'}
                </td>

                <td data-label="ACTIONS">
                  {isAdmin
                  ? 
                  actions(order._id) 
                  : 
                  order.isDelivered ? reviewOrder(order._id) : cancelOrder(order._id)}
                </td>

              </tr>
            )
          })}

        </tbody>

      </table>    

    </motion.main>
  )
}

export default OrdersList