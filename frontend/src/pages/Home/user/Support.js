import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import popAlert from '../../../components/popAlert'
import supportlogo from './support.png'

function Support() {

  const navigate = useNavigate()

  ///-- handle update form --///
  const [support, setSupport] = useState({
    complaintMessage: ``,
  })


  // handle input change
  function handleChange(event) {
    const {name, value} = event.target
    setSupport(prev => {
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
      url: `/api/complaints`,
      method: 'POST',
      headers: {
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      },
      data: support
    })
    .then((res) => {
      // show success message
      console.log(res.data)
      popAlert('We will get back to you ASAP','')
      // retrun to products page
      setTimeout(()=> navigate('/'), 2000) 
      return res.data
    })
    .catch(
      (error) => {
      console.log('err', error.response)
      }
    )
  }

  
  return (
    <div className='support-create' style={{padding: '3em'}}>

      <img src={supportlogo} alt='support' width={200}></img>

      <div className='support-form-container'>
        <form className='support-form' onSubmit={handleSubmit}>

          <p>How can we help you?</p>
          <textarea
          type='text'
          name='complaintMessage'
          required
          onChange={handleChange}
          value={support.complaintMessage}
          className='support-form-desc'
          >
          </textarea>

          <button>
            Subimt
          </button>

        </form>
      </div>

    </div>
  )
}

export default Support