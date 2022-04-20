import React from 'react'

function DashHome() {
  return (
    <div className='dashboard-section'>
      <h2>Dashboard</h2>

      <div className='summary-card'>
        <div>
          <h5>Total Sales</h5>
          <p>$10000</p>
        </div>
        <img src='https://api.iconify.design/emojione/money-bag.svg' alt='money'></img>
      </div>

      <div className='summary-card'>
        <div>
          <h5>Total Orders</h5>
          <p>50</p>
        </div>
        <img src='https://api.iconify.design/emojione/delivery-truck.svg' alt='truck'></img>
      </div>

      <div className='summary-card'>
        <div>
          <h5>Total Products</h5>
          <p>900</p>
        </div>
        <img src='https://api.iconify.design/emojione/department-store.svg' alt='shop'></img>
      </div>

    </div>
  )
}

export default DashHome