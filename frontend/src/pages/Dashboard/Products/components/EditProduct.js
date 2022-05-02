import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import FileUploader from '../../../../components/FileUploader'
import Select from 'react-dropdown-select'
import apiCrud from '../../../../Helpers/apiCrud'

function EditProduct() {

  const params = useParams()

  // store all products
  const [products, setProducts] = useState([])
  // console.log(products)

  // get all products
  useEffect(()=> {
    axios.get('/api/products?productNum=Infinity')
    .then(data => setProducts(data.data.products))
  },[])

  // pre filled the form with current infos
  React.useEffect(()=> {
    axios.get(`/api/products/${params.id}`)
    .then(res => setUpdateForm(res.data))
  },[params.id])


  ///-- handle update form --///
  const [updateForm, setUpdateForm] = useState({
    name: ``,
    price: ``,
    discount: ``,
    description: ``,
    image: ``,
    brand: ``,
    category: ``,
    subCategory: ``,
    countInStock: ``
  })

  console.log(updateForm)


  // handle input change
  function handleChange(event) {
    const {name, value} = event.target
    setUpdateForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // handle uploaded image
  function handleUpload(url) {
    setUpdateForm(prev => {
      return {
        ...prev,
        image: url
      }
    })
  }


  // handle submit
  async function handleSubmit(event) {
    event.preventDefault() 
    apiCrud(`/api/products/${params.id}`, 'PUT', 'Product updated', updateForm)
  }


  // handle sub category drop menu
  // map over products and return only unique values without undefined
  const categories = [...new Set(products.map(p => p.category).filter(p => p !== undefined))]

  const [optionsCategories, setOptionsCategories] = useState('')

  useEffect(()=> {
    setOptionsCategories(categories.map(c => (
      {
      value: c, 
      label: c
    })))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[products])

  // handle input change
  function handleCategoryChange(value) {
    setUpdateForm(prev => {
      return {
        ...prev,
        category: value.length > 0 ? value[0].value : 'none'
      }
    })
  }


  // handle sub category drop
  // map over products and return only unique values without undefined
  const subCategories = [...new Set(products.map(p => p.subCategory).filter(p => p !== undefined))]

  const [optionsSubCategories, setOptionsSubCategories] = useState('')

  useEffect(()=> {
    setOptionsSubCategories(subCategories.map(c => (
      {
      value: c, 
      label: c
    })))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[products])

  // handle input change
  function handleSubCategoryChange(value) {
    setUpdateForm(prev => {
      return {
        ...prev,
        subCategory: value.length > 0 ? value[0].value : 'none'
      }
    })
  }

  
  return (
    <div className='dash-products-create'>
      <h2>Edit Product</h2>

      <div className='dash-products-form-container'>

        <img src={updateForm.image} alt='product'></img>

        <form className='dash-products-form' onSubmit={handleSubmit}>

          <div>
            <p>Product title</p>
            <input
            type='text'
            name='name'
            required
            onChange={handleChange}
            value={updateForm.name}
            >
            </input>
          </div>

          <div>
            <p>Description</p>
            <textarea
            type='text'
            name='description'
            required
            onChange={handleChange}
            value={updateForm.description}
            className='dash-products-form-desc'
            >
            </textarea>
          </div>

          <FileUploader handleUpload={handleUpload}/>

          <div className='dash-products-form-cat'>

            <div>
              <p>Brand</p>
              <input
              type='text'
              name='brand'
              required
              onChange={handleChange}
              value={updateForm.brand}
              >
              </input>
            </div>

            <div>
              <p>In Stock</p>
              <input
              type='text'
              name='countInStock'
              required
              onChange={handleChange}
              value={updateForm.countInStock}
              >
              </input>
            </div>

          </div>

          <div className='dash-products-form-cat'>

            <div>
              <p>Category</p>
              <Select
                create
                clearable
                placeholder={updateForm.category}
                options={optionsCategories}
                onChange={(value)=>handleCategoryChange(value)}
                className='dropSelect'
              />
            </div>

            <div>
              <p>Sub Category</p>
              <Select
                create
                clearable
                placeholder={updateForm.subCategory}
                options={optionsSubCategories}
                onChange={(value)=>handleSubCategoryChange(value)}
                className='dropSelect'
              />
            </div>

          </div>

          <div className='dash-products-form-cat'>
            <div>
              <p>Price</p>
              <input
              type='text'
              name='price'
              required
              onChange={handleChange}
              value={updateForm.price}
              >
              </input>
            </div>

            <div>
              <p>Discount</p>
              <input
              type='text'
              name='discount'
              required
              onChange={handleChange}
              value={updateForm.discount}
              >
              </input>
            </div>
          </div>          

          <button>
            Update info
          </button>

        </form>
      </div>

    </div>
  )
}

export default EditProduct