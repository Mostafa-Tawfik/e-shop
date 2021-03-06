import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import Select from 'react-dropdown-select'
import useProducts from '../../../hooks/useProducts'
import { SpinnerDotted } from 'spinners-react'
import popAlert from '../../../Helpers/popAlert'
import apiCrud from '../../../Helpers/apiCrud'
import popAction from '../../../Helpers/popAction'
import useCreateProduct from '../../../hooks/useCreateProduct'

function Products() {

  const navigate = useNavigate()
  const createProduct = useCreateProduct()

  const {status, data: products, error} = useProducts()

  if(error) {
    popAlert('Somthing went wrong', 'error')
  }

  
  // set controls for actions drop menu
  const actionMenu = [
    {value: 'Edit', label: 'Edit'},
    {value: 'Delete', label: 'Delete'},
  ]

  const [action, setAction] = useState('')

  // detect and execute actions from drop menu
  useEffect(()=>{
    if (action.value === 'Edit') {
      navigate(`/products/edit/${action.id}`)
    } else if (action.value === 'Delete') {
      popAction('Are you sure?', 
      "You won't be able to revert this!",
      'Yes, delete it!',
      ()=>apiCrud(`/api/products/${action.id}`, 'DELETE', 'Product deleted')()
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[action])

  
  return (
    <div className='dash-products-section'>
      <h2>Products</h2>

      <button 
      onClick={()=>createProduct()}
      className='dash-add-product-btn'>
        <p>+ Create new product</p>
      </button>

      <div className='dash-cards-container'>
        {status === 'loading' && <SpinnerDotted />}
        {status === 'success' && products.map(p => {
          return (
            <div key={p._id} className='dash-product-card'>

              <Link to={`/products/edit/${p._id}`}>
                <img src={p.image.charAt(0) !== '/' ? p.image : 'https://api.iconify.design/bxs/error.svg'} alt='product'></img> 
              </Link>

              <div className='dash-product-details'>

                <Link to={`/products/edit/${p._id}`}>
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
                  searchable={false}
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