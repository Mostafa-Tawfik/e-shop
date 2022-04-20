import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

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

  //-- create new product --//
  async function createProduct() {

    await axios({
      url: '/api/products',
      method: 'POST',
      headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
        }
    })
    .then((res) => {
      console.log('Product created')
      alert('Product created')
      console.log(res.data)
      window.location.reload()
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }
  ///-- end --///


  //-- create new product --//
  async function deleteProduct(id) {

    await axios({
      url: `/api/products/${id}`,
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
        }
    })
    .then((res) => {
      console.log('Product deleted')
      alert('Product deleted')
      console.log(res.data)
      window.location.reload()
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }
  ///-- end --///
  
  return (
    <div className='dash-products-section'>
      <h2>Products</h2>

      {/* <Link to={'/dashboard/products/create'}> */}
        <button 
        onClick={()=>createProduct()}
        className='dash-add-product-btn'>
          <p>+ Create new product</p>
        </button>
      {/* </Link> */}

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
                <p onClick={()=>deleteProduct(p._id)}>Delete</p>
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