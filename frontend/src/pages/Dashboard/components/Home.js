import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DashHome() {

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
    // console.log('orders', orders)
  
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

      </div>

    </div>
  )
}

export default DashHome