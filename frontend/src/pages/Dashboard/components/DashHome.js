import React from 'react'
import axios from 'axios'

function DashHome() {

  // store all products
  const [products, setProducts] = React.useState([])
  console.log(products)

  // get all products
  React.useEffect(()=> {
    axios.get('/api/products')
    .then(data => setProducts(data.data.products))
  },[])

  return (
    <div className='dashboard-section'>
      <h2>Dashboard</h2>

      <div className='summary-card-container'>

        <div className='summary-card'>
          <div>
            <h5>Total Sales</h5>
            <p>$1000</p>
          </div>
          <img src='https://api.iconify.design/emojione/money-bag.svg' alt='money'></img>
        </div>

        <div className='summary-card'>
          <div>
            <h5>Total Orders</h5>
            <p>10</p>
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