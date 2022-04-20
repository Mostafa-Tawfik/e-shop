import axios from 'axios'
import React, { useState } from 'react'

function DashboardProducts() {

  // store all products
  const [products, setProducts] = React.useState([])
  console.log(products)

  // get all products
  React.useEffect(()=> {
    axios.get('/api/products')
    .then(data => setProducts(data.data.products))
  },[])

  // control more btn
  const [isOpen, setIsOpen] = useState({
    open: false,
    id: ''
  })

  // toggle more btn
  function toggleMoreBtn(id) {
    setIsOpen(prev => {
      return {
        ...prev,
        open: !isOpen.open,
        id: id
      }
      })
  }
  
  return (
    <div className='dash-products-section'>
      <h2>Products</h2>

      <div className='dash-cards-container'>
        {products.map(p => {
          return (
            <div key={p._id} className='dash-product-card'>

              <img src='https://api.iconify.design/emojione/money-bag.svg' alt='money'></img>

              <div className='dash-product-details'>
                <h5>{p.name}</h5>
                <p>Price: ${p.price}</p>
                {p.discount && <p>Discount: {p.discount}%</p>}
                <p>In Stock: {p.countInStock}</p>
              </div>

              <button 
              // toggle more btn
              onClick={()=>toggleMoreBtn(p._id)} 
              className='dash-product-action-btn'>
                <img src='https://api.iconify.design/akar-icons/more-horizontal-fill.svg' alt='more'></img>
              </button>
              
              {
              // if target btn clicked toggle
              isOpen.id === p._id && 
              isOpen.open && 
              <div className='dash-product-actions'>
                <p>View details</p>
                <p>Edit info</p>
                <p>Delete</p>
              </div>
              }

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default DashboardProducts