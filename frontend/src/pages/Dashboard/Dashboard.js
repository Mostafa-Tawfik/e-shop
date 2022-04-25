import React, { useEffect, useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'

import Orders from './components/Orders/Orders'
import Home from './components/Home'
import Products from './components/Products/Products'
import EditProduct from './components/Products/components/EditProduct'
import OrderID from './components/Orders/OrderID'
import Users from './components/Users/Users'
import SideMenu from '../../components/SideMenu'
import axios from 'axios'
import UserID from './components/Users/UserID'
import Support from './components/Support/Support'


function Dashboard(props) {

  const adminPanel = ['Dashboard', 'Products', 'Orders', 'Users', 'Support']

  // store users
  const [users, setUsers] = useState('')
  // console.log(users)

  // fetch all users
  useEffect(()=> {
    axios.get('/api/users/', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setUsers(data.data))
  },[])


  // store tickets
  const [tickets , setTickets] = useState('')
  // console.log(tickets)

  // fetch all users
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
    <div className='dashboard'>

      <div className='admin-panel'>
        <h4>Admin Panel</h4>
        {adminPanel.map((section, index) => {
        return (
          <Link key={index} to={section !== 'Dashboard' ? `/dashboard/${section.toLowerCase()}` : '/'}>
            <div className='panel-section'>
                {section}
            </div>
          </Link>
        )})}
      </div>

      <div className='admin-side-menu'>
        <div>
          <SideMenu content={adminPanel}/>
        </div>

        <button onClick={()=>props.signOut()} className='logout'>Logout</button>
      </div>

      <div className='sections'>
        <Routes>
          <Route path='/' 
          element={<Home users={users} products={products} orders={orders} tickets={tickets}/>}/>

          <Route path='/dashboard/products' 
          element={<Products products={products}/>}/>

          <Route path='/dashboard/products/edit/:id' 
          element={<EditProduct />}/>

          <Route path='/dashboard/orders' 
          element={<Orders isAdmin={props.isAdmin} orders={orders}/>}/>

          <Route path='/dashboard/orders/:id' 
          element={<OrderID />}/>

          <Route path='/dashboard/users' 
          element={<Users users={users}/>}/>

          <Route path='/dashboard/users/:id' 
          element={<UserID tickets={tickets} orders={orders} products={products} isAdmin={props.isAdmin}/>}/>

          <Route path='/dashboard/support' 
          element={<Support tickets={tickets}/>}/>
          
        </Routes>
      </div>

      

    </div>
  )
}

export default Dashboard