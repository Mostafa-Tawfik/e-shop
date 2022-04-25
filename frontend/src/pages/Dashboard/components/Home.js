import React from 'react'

function Home(props) {

  const {products, orders, users} = props

  return (
    <div className='dashboard-section'>
      <h2>Dashboard</h2>

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

      </div>

    </div>
  )
}

export default Home