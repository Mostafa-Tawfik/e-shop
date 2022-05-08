import React, { useState } from 'react'
import { motion } from 'framer-motion';

import OrderPreview from './Components/OrderPreview'
import Payment from './Components/Payment'
import Shipping from './Components/Shipping'

function Checkout() {

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

  const pageMotion= {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
    initial='initial'
    animate='animate'
    exit='exit'
    variants={pageMotion} 
    className='checkout'>

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

      <div style={{display: isDone.shipping ? 'none' : 'block'}}>
        <Shipping goPayment={goPayment}/>
      </div>

      <div style={{display: isDone.shipping ? isDone.payment ? 'none' : 'block' : 'none'}}>
        <Payment goOrderPreview={goOrderPreview}/>
      </div>

      <div style={{display: isDone.shipping ? isDone.payment ? 'block' : 'none' : 'none'}}>
        <OrderPreview />
      </div>
      
    </motion.div>
  )
}

export default Checkout