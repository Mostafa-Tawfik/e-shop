import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import popAlert from '../../../components/popAlert'
import Select from 'react-dropdown-select'

function Products(props) {

  const navigate = useNavigate()

  // store all products
  const products = props.products

  console.log(products);


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
      popAlert('Product deleted')
      setTimeout(()=> window.location.reload(), 2000) 
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }
  ///-- end --///

  const actionMenu = [
    {value: 'Edit', label: 'Edit'},
    {value: 'Delete', label: 'Delete'},
  ]

  const [action, setAction] = useState('')

  useEffect(()=>{
    if (action.value === 'Edit') {
      navigate(`/dashboard/products/edit/${action.id}`)
    } else if (action.value === 'Delete') {
      deleteProduct(action.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[action])

  console.log(action);
  
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

              <div className='dash-product-actions'>
                <Select
                  options={actionMenu}
                  onChange={(value)=>(setAction({
                    value: value[0].value,
                    id: p._id
                  }))}
                />
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Products