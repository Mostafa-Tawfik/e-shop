import React from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom'

function Header(props) {

  const navItems = ['Smartphones', 'Tablets', 'Wearables', 'Electronics', 'Appliances']

  // console.log(props.cart)

  return (
    <div>
      <div className='top-pane'>
        <div className='top-pane_info'>
          <p>Fast & Free Delivery</p>
          <p>Shop though a wide range of products</p>
          <p>Free Returns</p>
        </div>
      </div>

      <div className='bottom-pane'>
        <div className='bottom-pane_info'>

          <Link to={'/'}>
            <div className="App-title">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1>E-Shop</h1>
            </div>
          </Link>

          <input className="header-search"
            placeholder='Search Products'
          ></input>
          <h3>Deals</h3>
          <h3>Account</h3>

          <Link to={'/cart'}>
            <div className='header-cart'>
              <img src='https://api.iconify.design/emojione/shopping-cart.svg' className="cart-logo" alt="cart"/>
              <div className='cart-counter'>{props.cart.length}</div>
            </div>
          </Link>

          
        </div>
      </div>

      <div className="navbar">
        {navItems.map((i,index) => {
          return (
            <h4 key={index} className="navbar-item">{i}</h4>
          )
        })}
      </div>

    </div>
  )
}

export default Header