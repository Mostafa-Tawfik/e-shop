import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function EditProduct() {

  const params = useParams()

  ///-- handle current product --///
  const [product, setProduct] = React.useState('')
  console.log(product)

  React.useEffect(()=> {
    axios.get(`/api/products/${params.id}`)
    .then(res => setUpdateForm(res.data))
  },[params.id])
  ///-- end --///


  ///-- handle update form --///
  const [updateForm, setUpdateForm] = useState({
    name: `${product.name}`,
    price: `${product.price}`,
    discount: `${product.discount}`,
    description: `${product.description}`,
    image: `${product.image}`,
    brand: `${product.brand}`,
    category: `${product.category}`,
    countInStock: `${product.countInStock}`
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

  return (
    <div className='dash-products-create'>
      <h2>Edit Product</h2>

      <div className='dash-products-form-container'>
        <form className='dash-products-form'>

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

          <div>
            <p>Images</p>
            <input
            type='text'
            name='image'
            required
            onChange={handleChange}
            value={updateForm.image}
            >
            </input>
          </div>

          <div className='dash-products-form-cat'>
            <div>
              <p>Category</p>
              <input
              type='text'
              name='category'
              required
              onChange={handleChange}
              value={updateForm.category}
              >
              </input>
            </div>

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

          <div className='dash-products-form-cat'>
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

          <button>
            Update info
          </button>

        </form>
      </div>

    </div>
  )
}

export default EditProduct