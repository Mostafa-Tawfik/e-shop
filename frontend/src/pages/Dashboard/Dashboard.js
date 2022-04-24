import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'

import Orders from './components/Orders/Orders'
import Home from './components/Home'
import Products from './components/Products/Products'
import EditProduct from './components/Products/components/EditProduct'
import OrderID from './components/Orders/OrderID'
import Users from './components/Users/Users'
import SideMenu from '../../components/SideMenu'


function Dashboard(props) {

  const adminPanel = ['Dashboard', 'Products', 'Orders', 'Users', 'Reviews', 'Brands']

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
          <Route path='/' element={<Home />}/>

          <Route path='/dashboard/products' element={<Products />}/>
          <Route path='/dashboard/products/edit/:id' element={<EditProduct />}/>

          <Route path='/dashboard/orders' element={<Orders isAdmin={props.isAdmin}/>}/>

          <Route path='/dashboard/orders/:id' element={<OrderID />}/>

          <Route path='/dashboard/users' element={<Users />}/>
          
        </Routes>
      </div>

      

    </div>
  )
}

export default Dashboard