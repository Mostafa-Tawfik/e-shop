import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import DashHome from './components/DashHome'
import DashProducts from './components/Products'
import EditProduct from './components/Products/components/EditProduct'

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
          <Route path='/' element={<DashHome />}/>
          <Route path='/dashboard/products' element={<DashProducts />}/>
          <Route path='/dashboard/products/edit/:id' element={<EditProduct />}/>
        </Routes>
      </div>

      <button onClick={()=>props.signOut()} className='logout'>Logout</button>

    </div>
  )
}

export default Dashboard