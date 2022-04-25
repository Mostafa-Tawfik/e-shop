import React, { useState } from 'react'


function Payment(props) {

  ///-- handle shipping form --///
  const [payment, setPayment] = useState({
    paymentMethod: '',
  })


   // handle input change
   function handleChange(event) {
    const {name, value} = event.target
    setPayment(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  // handle placment
  async function handleSubmit(event) {
    event.preventDefault()

    props.setPaymentMethod(payment)
    props.placeOrder()  
    props.goOrderPreview()

}


  return (
    <div className='checkout-payment'>

      <h4>Payment</h4>
      <p>Choose your payment method.</p>
      
      <form onSubmit={handleSubmit} className='checkout-payment-form'>

        <div className='checkout-payment-form-radio'>
          <input 
            type='radio'
            name='paymentMethod'
            required
            onChange={handleChange}
            value={'Cash on Delivery'}
            >
          </input>
          <p>Cash on Delivery</p>
        </div>

        <div className='checkout-payment-form-radio'>
          <input
            type='radio'
            name='paymentMethod'
            required
            onChange={handleChange}
            value={'Credit / Debit Card'}
            >
          </input>
          <p>Credit / Debit Card</p>
        </div>

        <button>
            Next
        </button>

      </form>

    </div>
  )
}

export default Payment