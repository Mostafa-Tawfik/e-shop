import React from 'react'

function CreateProduct() {
  return (
    <div className='dash-products-create'>
      <h2>Create new Product</h2>

      <div className='dash-products-form-container'>
        <form className='dash-products-form'>

          <p>Product title</p>
          <input>
          </input>

          <p>Description</p>
          <input>
          </input>

          <p>Images</p>
          <input>
          </input>

          <p>Category</p>
          <input>
          </input>

          <p>Price</p>
          <input>
          </input>

        </form>
      </div>

    </div>
  )
}

export default CreateProduct