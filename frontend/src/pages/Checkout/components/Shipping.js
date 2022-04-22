import React, { useEffect, useState } from 'react'

function Shipping(props) {

  ///-- handle shipping form --///
  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })


  // auto fill the shipping form if submitted
  useEffect(()=> {
    if(props.order.shippingAddress) {
      setShipping(props.order.shippingAddress)
    }
  },[])


   // handle input change
   function handleChange(event) {
    const {name, value} = event.target
    setShipping(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  // handle submit
  function handleSubmit(event) {
    event.preventDefault()

    props.setShippingAddress(shipping)
    props.goNext()
  }


  return (
    <div className='checkout-shipping'>

      <h4>Shipping</h4>
      <p>Choose where you want to recived your product.</p>
      
      <form onSubmit={handleSubmit} className='checkout-shipping-form'>

        <div>
          <p>Address</p>
          <textarea className='checkout-shipping-form-address'
            type='text'
            name='address'
            required
            onChange={handleChange}
            value={shipping.address}
            >
          </textarea>
        </div>

        <div>
          <p>City</p>
          <input
            type='text'
            name='city'
            required
            onChange={handleChange}
            value={shipping.city}
            >
          </input>
        </div>

        <div>
          <p>Postal Code</p>
          <input
            type='text'
            name='postalCode'
            required
            onChange={handleChange}
            value={shipping.postalCode}
            >
          </input>
        </div>

        <div>
          <p>Country</p>
          <input
            type='text'
            name='country'
            required
            onChange={handleChange}
            value={shipping.country}
            >
          </input>
        </div>

        <button>
            Next
        </button>

      </form>

    </div>
  )
}

export default Shipping