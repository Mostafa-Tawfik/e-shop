import React, { useState } from 'react'
import Payment from './components/Payment'
import Shipping from './components/Shipping'

function Checkout(props) {

  // handle go next section
  const [isDone, setIsDone] = useState(false)

  function goNext() {
    setIsDone(prev => !prev)
  }

  return (
    <div className='checkout'>

      <div className='checkout-wizard'>

        <div 
          className='checkout-wizard-step'
          style={{background: isDone ? 'green' : 'block'}}
         >
          <p>Shipping</p>
        </div>

          <div>&rArr;</div>
        
        <div className='checkout-wizard-step'>
          <p>Payment</p>
        </div>
      </div>

      <div style={{display: isDone ? 'none' : 'block'}}>
        <Shipping {...props} goNext={goNext}/>
      </div>

      <div style={{display: isDone ? 'block' : 'none'}}>
        <Payment {...props} />
      </div>
      
    </div>
  )
}

export default Checkout