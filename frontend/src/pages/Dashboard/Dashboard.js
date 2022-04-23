import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import Orders from './components/Orders/Orders'
import Home from './components/Home'
import Products from './components/Products/Products'
import EditProduct from './components/Products/components/EditProduct'
import OrderID from './components/Orders/OrderID'

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

      <div className='sections'>
        <Routes>
          <Route path='/' element={<Home />}/>

          <Route path='/dashboard/products' element={<Products />}/>
          <Route path='/dashboard/products/edit/:id' element={<EditProduct />}/>

          <Route path='/dashboard/orders' element={<Orders isAdmin={props.isAdmin}/>}/>

          <Route path='/dashboard/orders/:id' element={<OrderID />}/>
        </Routes>
      </div>

      <button onClick={()=>props.signOut()} className='logout'>Logout</button>

    </div>
  )
}

export default Dashboard