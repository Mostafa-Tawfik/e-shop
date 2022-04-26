import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'

import Home from './Home/Home'
import Products from './Products/Products'
import EditProduct from './Products/components/EditProduct'
import Orders from './Orders/Orders'
import OrderID from './Orders/OrderID'
import Users from './Users/Users'
import SideMenu from '../../components/SideMenu'
import UserID from './Users/UserID'
import Support from './Support/Support'


function Dashboard(props) {

  const {isAdmin} = props

  const adminPanel = ['Products', 'Orders', 'Users', 'Support']

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
  },[isAdmin])


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
  },[isAdmin])


  // store all products
  const [products, setProducts] = useState([])
  // console.log(products)

  // get all products
  useEffect(()=> {
    axios.get('/api/products?productNum=Infinity')
    .then(data => setProducts(data.data.products))
  },[isAdmin])


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
  },[isAdmin])

  return (
    <div className='dashboard'>

      <div className='admin-panel'>
        <h4>Admin Panel</h4>

        <Link to='/'>
          <div className='panel-section'>
            Dashboard
          </div>
        </Link>

        {adminPanel.map((section, index) => {
        return (
          <Link key={index} to={section !== 'Dashboard' ? `/${section.toLowerCase()}` : '/'}>
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

          <Route path='/products' 
          element={<Products products={products}/>}/>

          <Route path='/products/edit/:id' 
          element={<EditProduct products={products}/>}/>

          <Route path='/orders' 
          element={<Orders isAdmin={props.isAdmin} orders={orders}/>}/>

          <Route path='/orders/:id' 
          element={<OrderID />}/>

          <Route path='/users' 
          element={<Users users={users}/>}/>

          <Route path='/users/:id' 
          element={<UserID tickets={tickets} orders={orders} products={products} isAdmin={props.isAdmin}/>}/>

          <Route path='/support' 
          element={<Support tickets={tickets}/>}/>
          
        </Routes>
      </div>

      

    </div>
  )
}

export default Dashboard