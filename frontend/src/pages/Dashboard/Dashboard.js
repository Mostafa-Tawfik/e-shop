import React, { useContext } from 'react'
import {Routes, Route, Link} from 'react-router-dom'

import Home from './Home/Home'
import Products from './Products/Products'
import EditProduct from './Products/components/EditProduct'
import Orders from './Orders/Orders'
import OrderID from './Orders/OrderID'
import Users from './Users/Users'
import SideMenu from '../../layout/SideMenu'
import UserID from './Users/UserID'
import Support from './Support/Support'
import Statistics from './Statistics/Statistics'
import { AuthContext } from '../../context/Auth-context'


function Dashboard() {

  const {signOut} = useContext(AuthContext)


  const adminPanel = ['Products', 'Orders', 'Users', 'Support', 'Statistics']
 

  return (
    <div className='dashboard'>

      <div className='admin-header'>
        <div className="admin-top-pane">
          <div>
            <SideMenu content={adminPanel}/>
          </div>

          <button onClick={signOut} className='logout'>Logout</button>
        </div>

        <div className="admin-bottom-pane">
          <img src="https://cdn-icons-png.flaticon.com/512/237/237474.png?w=996&t=st=1651700886~exp=1651701486~hmac=f95531cdefbead1db2e79d20e5d3d66b3b7f4878bf4ee0c3746bb34376fe8815" alt="" />
          <Link to={'/'}>
            <h1>Dashboard</h1>
          </Link>
        </div>
      </div>

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


      <div className='sections'>
        <Routes>
          <Route path='/' 
          element={<Home />}/>

          <Route path='/products' 
          element={<Products />}/>

          <Route path='/products/edit/:id' 
          element={<EditProduct />}/>

          <Route path='/orders' 
          element={<Orders />}/>

          <Route path='/orders/:id' 
          element={<OrderID />}/>

          <Route path='/users' 
          element={<Users />}/>

          <Route path='/users/:id' 
          element={<UserID />}/>

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