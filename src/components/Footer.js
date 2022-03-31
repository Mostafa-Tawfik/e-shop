import React from 'react'
import logo from '../logo.svg';

function Footer() {

  const footer = [
    {
      title: 'Customer service',
      sections: ['Return & Exchange', 'Shipping & Delivery', 'Service & Warranty']
    },
    {
      title: 'Shop with Us',
      sections: ['Your Account', 'Your Orders', 'Your Addresses', 'Your Lists']
    },
    {
      title: 'More About Us',
      sections: ['About E-Shop', 'Careers', 'Your Addresses', 'Your Lists']
    },
  ]

  return (
    <div>
      <div className='footer-top-pane'>
        <h3>BACK TO TOP</h3>
      </div>

      <div>
        <div className='footer-main'>
          <img src={logo} className="App-logo-footer" alt="logo"/>
          {footer.map(s => {
            return (
              <div className='footer-main-section'>
                <h4>{s.title}</h4>
                {s.sections.map(s => {
                  return (
                    <p>{s}</p>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <div className='footer-bottom-pane'>
        <p>© 2022 Carrefour. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer