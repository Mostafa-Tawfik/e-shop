import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Statistics() {

   // store users
   const [users, setUsers] = useState('')
   // console.log(users)
 
   // fetch all users
   useEffect(()=> {
     const fetchUsers = async () => {
       await axios.get('/api/users/', {
         headers: {
           Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
         }
       })
       .then(data => setUsers(data.data))      
     }
     fetchUsers()
   },[])
 
 
   // store tickets
   const [tickets , setTickets] = useState('')
   // console.log(tickets)
 
   // fetch all tickets
   useEffect(()=> {
     axios.get('/api/complaints/', {
       headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
       }
     })
     .then(data => setTickets(data.data))
   },[])
 
 
   // store all products
   const [products, setProducts] = useState([])
   // console.log(products)
 
   // get all products
   useEffect(()=> {
     axios.get('/api/products?productNum=Infinity')
     .then(data => setProducts(data.data.products))
   },[])
 
 
   // store orders
   const [orders, setOrders] = useState('')
   // console.log(orders)
 
   // fetch all orders
   useEffect(()=> {
     axios.get('/api/orders/', {
       headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
       }
     })
     .then(data => setOrders(data.data))
   },[])


  return (
    <div className='statistics-section'>
      <h2>Statistics</h2>

      <div className='summary-card-container'>

        <div className='summary-card'>
          <div>
            <h5>Total Sales</h5>
            <p>${orders && orders.map(o => o.totalPrice).reduce((x, y) => x + y).toFixed()}</p>
          </div>
          <img src='https://api.iconify.design/emojione/money-bag.svg' alt='money'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Orders</h5>
            <p>{orders.length}</p>
          </div>
          <img src='https://api.iconify.design/emojione/delivery-truck.svg' alt='truck'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Products</h5>
            <p>{products.length}</p>
          </div>
          <img src='https://api.iconify.design/emojione/department-store.svg' alt='shop'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Users</h5>
            <p>{users.length}</p>
          </div>
          <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt='user'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Tickets</h5>
            <p>{tickets.length}</p>
          </div>
          <img src='https://api.iconify.design/icon-park/help.svg' alt='Tickets'></img>
        </div>

      </div>

    </div>
  )
}

export default Statistics