import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import popAlert from '../../../components/popAlert'

function Products(props) {

  const navigate = useNavigate()

  // store all products
  const products = props.products

  console.log(products);

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

  ///-- start create new product --///
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
      navigate(`/dashboard/products/edit/${res.data._id}`)
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }
  ///-- end --///


  //-- delete product --//
  async function deleteProduct(id) {

    await axios({
      url: `/api/products/${id}`,
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
        }
    })
    .then((res) => {
      popAlert('Done!', 'Product deleted')
      setTimeout(()=> window.location.reload(), 2000) 
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

      <button 
      onClick={()=>createProduct()}
      className='dash-add-product-btn'>
        <p>+ Create new product</p>
      </button>

      <div className='dash-cards-container'>
        {products.map(p => {
          return (
            <div key={p._id} className='dash-product-card'>

              <Link to={`/dashboard/products/edit/${p._id}`}>
                <img src={p.image.charAt(0) !== '/' ? p.image : 'https://api.iconify.design/bxs/error.svg'} alt='product'></img> 
              </Link>

              <div className='dash-product-details'>

                <Link to={`/dashboard/products/edit/${p._id}`}>
                  <h5>{p.name}</h5>
                </Link>
                <p>Added: {p.createdAt.substr(0 ,10)}</p>
                <p>Price: ${p.price}</p>
                <p>Category: {p.category}</p>
                <p>Sub Category: {p.subCategory}</p>
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

              <Link to={`/dashboard/products/${p._id}`}>
                <p>View details</p>
              </Link>

                <Link to={`/dashboard/products/edit/${p._id}`}>
                  <p>Edit info</p>
                </Link>

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

export default Products