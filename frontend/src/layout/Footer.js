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
      sections: ['Your Orders', 'Your Addresses', 'Your Tickets']
    },
    {
      title: 'More About Us',
      sections: ['About E-Shop', 'Careers']
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
          {footer.map((s, index) => {
            return (
              <div key={index} className='footer-main-section'>
                <h4>{s.title}</h4>
                {s.sections.map((s, index) => {
                  return (
                    <p key={index}>{s}</p>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <div className='footer-bottom-pane'>
        <p>All products are fake</p>
        <p>This is a protfolio project</p>
        <p>Images Powered by Unsplash</p>
        <p>© 2022 E-Shop. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer