import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import popAlert from '../../../Helpers/popAlert'

function UserInfo() {

  const navigate = useNavigate()

  // pre filled the form with current infos
  React.useEffect(()=> {
    axios.get(`/api/users/me`, {
      headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(res => setUpdateForm({
      name: res.data.user
    }))
  },[])


  ///-- handle update form --///
  const [updateForm, setUpdateForm] = useState({
    name: ``,
    image: ``,
    address: ``,
    phoneNumber: ``,
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


  // handle submit
  async function handleSubmit(event) {
    event.preventDefault() 

    await axios({
      url: `/api/users/me`,
      method: 'PUT',
      headers: {
         Authorization: `Bearer ${localStorage.jwt}`
      },
      data: updateForm
    })
    .then((res) => {
      // show success message
      console.log(res.data)
      popAlert('User updated')
      // retrun to products page
      setTimeout(()=> navigate('/'), 2000) 
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
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
            value={updateForm.name}
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