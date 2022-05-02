import React, { useState } from 'react'
import apiCrud from '../../../Helpers/apiCrud'

import supportlogo from './support.png'

function Support() {

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
    apiCrud(`/api/complaints`, 'POST', 'We will get back to you ASAP', support)
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