import React from 'react'

function Checkout() {
  return (
    <div className='checkout'>

      <div className='checkout-wizard'>
        <div>
          <div>&rArr;</div>
          <p>Billing</p>
        </div>

        <div>
          <div>&rArr;</div>
          <p>Shipping</p>
        </div>
        
        <div>
          <p>Payment</p>
        </div>
      </div>

    </div>
  )
}

export default Checkout