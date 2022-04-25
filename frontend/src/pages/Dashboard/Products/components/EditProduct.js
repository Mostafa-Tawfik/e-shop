import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FileUploader from '../../../../components/FileUploader'
import popAlert from '../../../../components/popAlert'

function EditProduct() {

  const params = useParams()
  const navigate = useNavigate()

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

  console.log(updateForm);


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

    await axios({
      url: `/api/products/${params.id}`,
      method: 'PUT',
      headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      },
      data: updateForm
    })
    .then((res) => {
      // show success message
      popAlert('', 'Product updated')
      // retrun to products page
      setTimeout(()=> navigate('/dashboard/products'), 2000) 
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }

  
  return (
    <div className='dash-products-create'>
      <h2>Edit Product</h2>

      <div className='dash-products-form-container'>
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
              <p>Sub Category</p>
              <input
              type='text'
              name='subCategory'
              required
              onChange={handleChange}
              value={updateForm.subCategory}
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