import React, { useState } from 'react'
import apiCrud from '../../../Helpers/apiCrud'

function UserInfo() {

  ///-- handle update form --///
  const [updateForm, setUpdateForm] = useState({
    name: ``,
    image: ``,
    address: ``,
    phoneNumber: ``,
  })

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

  // handle submit
  async function handleSubmit(event) {
    event.preventDefault() 
    apiCrud(`/api/users/me`,'PUT','User updated',updateForm)
  }
  
  return (
    <div className='dash-products-create' style={{padding: '3em'}}>

      <div className='dash-products-form-container'>
        <form className='dash-products-form' onSubmit={handleSubmit}>

          <div>
            <p>Full Name</p>
            <input
            type='text'
            name='name'
            required
            onChange={handleChange}
            value={updateForm.name ? updateForm.name : localStorage.userName}
            >
            </input>
          </div>

          <div>
            <p>Image (not required)</p>
            <input
            type='url'
            name='image'
            onChange={handleChange}
            value={updateForm.image}
            >
            </input>
          </div>

          <div>
            <p>Phone Number</p>
            <input
            type='text'
            name='phoneNumber'
            required
            onChange={handleChange}
            value={updateForm.phoneNumber}
            >
            </input>
          </div>

          <div>
            <p>Address</p>
            <textarea
            type='text'
            name='address'
            required
            onChange={handleChange}
            value={updateForm.address}
            className='dash-products-form-desc'
            >
            </textarea>
          </div>

          <button>
            Update info
          </button>

        </form>
      </div>

    </div>
  )
}

export default UserInfo