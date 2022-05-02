import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apiCrud from '../Helpers/apiCrud'


function OrdersList(props) {

  const navigate = useNavigate()
  const {isAdmin} = localStorage

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

  function deleteOrder(id) {
    apiCrud(`/api/orders/${id}`, 'DELETE', 'Order canceled')
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
      onClick={()=>deleteOrder(id)}
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
  
  return (
    <div className='orders-list-items'>

      <table className='orders-list-items-table'>

        <tbody>

          <tr>
            <th>Order ID</th>
            {isAdmin === 'true' && <th>NAME</th>}
            <th>DATE</th>
            <th>TOTAL</th>
            <th>Delivery</th>
            <th>Payment</th>
            <th>ACTIONS</th>
          </tr>

          {props.orders[0] && props.orders.map(order => {
            return (
              <tr key={order._id}>

                {/* if admin go to admin order route */}
                <td><Link to={`/${isAdmin === 'true' ? '' : 'user/'}orders/${order._id}`}>#{order._id}</Link></td>

                {isAdmin === 'true' && <td>{order.user.name}</td>}

                <td>{date(order.createdAt)}</td>

                <td>${order.totalPrice.toFixed(2)}</td>

                <td>
                  {order.isDelivered ? <p style={{color: 'green', fontWeight: 'bolder'}}>Delivered</p> : 'Processing'}
                </td>

                <td>
                  {order.isPaid ? <p style={{color: 'green', fontWeight: 'bolder'}}>Paid</p> : 'Cash on delivery'}
                </td>

                <td>
                  {isAdmin === 'true'
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

    </div>
  )
}

export default OrdersList