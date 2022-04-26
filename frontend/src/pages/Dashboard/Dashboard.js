import React from 'react'
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
import Statistics from './Statistics/Statistics'


function Dashboard(props) {


  const adminPanel = ['Products', 'Orders', 'Users', 'Support', 'Statistics']
 

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
          element={<Home />}/>

          <Route path='/products' 
          element={<Products />}/>

          <Route path='/products/edit/:id' 
          element={<EditProduct />}/>

          <Route path='/orders' 
          element={<Orders isAdmin={props.isAdmin}/>}/>

          <Route path='/orders/:id' 
          element={<OrderID />}/>

          <Route path='/users' 
          element={<Users />}/>

          <Route path='/users/:id' 
          element={<UserID isAdmin={props.isAdmin}/>}/>

          <Route path='/support' 
          element={<Support />}/>

          <Route path='/statistics' 
          element={<Statistics />}/>
          
        </Routes>
      </div>

      

    </div>
  )
}

export default Dashboard