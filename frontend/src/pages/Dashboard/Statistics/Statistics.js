import React from 'react'
import useApi from '../../../hooks/useApi'

function Statistics() {

   // fetch orders
   const {data: orders} = useApi('/api/orders', 'GET')

   // fetch users
   const { data: users} = useApi('/api/users/', 'GET')

   // fetch tickets
   const { data: tickets} = useApi('/api/complaints/', 'GET')

   // fetch products
   const { data: products} = useApi('/api/products?productNum=Infinity', 'GET')

 
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
            <p>{orders && orders.length}</p>
          </div>
          <img src='https://api.iconify.design/emojione/delivery-truck.svg' alt='truck'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Products</h5>
            <p>{products && products.products.length}</p>
          </div>
          <img src='https://api.iconify.design/emojione/department-store.svg' alt='shop'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Users</h5>
            <p>{users && users.length}</p>
          </div>
          <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt='user'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Tickets</h5>
            <p>{tickets && tickets.length}</p>
          </div>
          <img src='https://api.iconify.design/icon-park/help.svg' alt='Tickets'></img>
        </div>

      </div>

    </div>
  )
}

export default Statistics