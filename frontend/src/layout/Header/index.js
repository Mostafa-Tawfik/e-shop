import React from 'react'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'
import SearchBar from './components/SearchBar'

function Header(props) {

  const navItems = ['Smartphones', 'Tablets', 'Wearables', 'Electronics', 'Appliances']

  // a state to controll account drop down menu
  const [accountIsOpen, setAccountIsOpen] = React.useState(false)

  function openAccount() {
    setAccountIsOpen(prev => !prev)
  }
 
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

          {/* search bar */}
          <SearchBar />
          
          {/* user account */}
          <div onClick={openAccount}className="header-account-holder">
            <div className="header-account">

              <img src='https://api.iconify.design/mdi/account-circle.svg?color=whitesmoke' alt='account'></img>

              <div className='header-account-account'>
                {/* if signed in show a user welcome */}
                {props.userLoggedIn && <p>Hi {props.userLoggedIn.name}!</p>}
                <h3>Account</h3>
              </div>

              <img src='https://api.iconify.design/mdi/menu-down.svg?color=whitesmoke' alt='arrow'></img>
            </div>
            {accountIsOpen && <div className="header-account-li" tabIndex='true' onBlur={openAccount}>

              {props.userLoggedIn ?
              // if signed in
              <button onBlur={openAccount} onClick={props.signOut}>Sign Out</button>
              :
              // if signed out
              <Link to={'/login'}>
                <button onBlur={openAccount}>Sign In</button>
              </Link>
              }
              <hr></hr>
              <h5>My Account</h5>
              <h5>Orders</h5>
              <h5>Favorite</h5>
            </div>}
          </div>

          {/* cart */}
          <Link to={'/cart'}>
            <div className='header-cart'>
              <img src='https://api.iconify.design/clarity/shopping-cart-solid-badged.svg?color=whitesmoke' className="cart-logo" alt="cart"/>
              <div className='cart-counter'>{props.cart.length}</div>
            </div>
          </Link>
          
        </div>
      </div>

      {/* navbar */}
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