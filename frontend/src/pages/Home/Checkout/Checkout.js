import React, { useState } from 'react'
import OrderPreview from './Components/OrderPreview'
import Payment from './Components/Payment'
import Shipping from './Components/Shipping'

function Checkout(props) {

  // handle go next section
  const [isDone, setIsDone] = useState({
    shipping: false,
    payment: false
  })

  function goPayment() {
    setIsDone(prev => ({
      ...prev,
      shipping: true
    }))
  }

  function goOrderPreview() {
    setIsDone(prev => ({
      ...prev,
      payment: true
    }))
  }

  return (
    <div className='checkout'>

      <div className='checkout-wizard'>

        <div 
          className='checkout-wizard-step'
          style={{background: isDone.shipping ? 'green' : 'block'}}
         >
          <p>Shipping</p>
        </div>

          <div>&rArr;</div>
        
        <div 
        className='checkout-wizard-step'
        style={{background: isDone.payment ? 'green' : 'block'}}
        >
          <p>Payment</p>
        </div>

          <div>&rArr;</div>
        
        <div className='checkout-wizard-step'>
          <p>Order Preview</p>
        </div>

      </div>

      <div style={{
        display: 
        isDone.shipping ? 
        'none' 
        : 'block'
        }}>
        <Shipping {...props} goPayment={goPayment}/>
      </div>

      <div style={{
        display: 
        isDone.shipping ? 
        isDone.payment ? 'none' : 'block' 
        : 'none'
      }}>
        <Payment {...props} goOrderPreview={goOrderPreview}/>
      </div>

      <div style={{
        display: 
        isDone.shipping ? 
        isDone.payment ? 'block' : 'none' 
        : 'none'
      }}>
        <OrderPreview {...props} />
      </div>
      
    </div>
  )
}

export default Checkout