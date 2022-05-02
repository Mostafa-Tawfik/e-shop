import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import Select from 'react-dropdown-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useGetProducts from '../../../hooks/useGetProducts'
import { SpinnerDotted } from 'spinners-react'
import popAlert from '../../../Helpers/popAlert'
import apiCrud from '../../../Helpers/apiCrud'

function Products() {

  const navigate = useNavigate()

  const {status, data: products, error} = useGetProducts()

  if(error) {
    popAlert('Somthing went wrong', 'error')
  }


  // create new product
  function createProduct() {
    apiCrud('/api/products', 'POST', 'Product added')
  }

  
  // delete product
  async function deleteProduct(id) {
    apiCrud(`/api/products/${id}`, 'DELETE')
  }

  // set controls for actions drop menu
  const actionMenu = [
    {value: 'Edit', label: 'Edit'},
    {value: 'Delete', label: 'Delete'},
  ]

  const [action, setAction] = useState('')

  const MySwal = withReactContent(Swal)

  // detect and execute actions from drop menu
  useEffect(()=>{
    if (action.value === 'Edit') {
      navigate(`/products/edit/${action.id}`)
    } else if (action.value === 'Delete') {
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success',
            deleteProduct(action.id),
          )
        }
      })
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