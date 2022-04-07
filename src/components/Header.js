import React, { Fragment } from 'react'
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import AppData from '../AppData';

function Header(props) {

  const navItems = ['Smartphones', 'Tablets', 'Wearables', 'Electronics', 'Appliances']

  // a state to controll account drop down menu
  const [accountIsOpen, setAccountIsOpen] = React.useState(false)

  function openAccount() {
    setAccountIsOpen(prev => !prev)
  }

  // a state to hold search queries
  const [query, setQuery] = React.useState('')
  // console.log(query)

  // a state to hold search queries
  const [results, setResults] = React.useState([])
  console.log(results)

  // when query filter AppData and return includes query
  React.useEffect(() => {
    query === '' ?
    setResults([]) :
    setResults(AppData.Products.filter(p => p.title.toUpperCase().includes(query.toUpperCase())))
  },[query])


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
          <div className="header-search">
            <input 
              className="header-search-bar"
              type='text'
              placeholder='What are you looking for?'
              name='query'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>

            <div className='header-search-results' style={query === '' ? {padding: '0'} : {padding: '1em'}}>
              {results.map(r => {
                return (
                  <div key={r.id}>
                    <div>{r.title}</div>
                    <p>{r.category}</p>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* <h3>Deals</h3> */}

          {/* user account */}
          <div onClick={openAccount} className="header-account-holder">
            <div className="header-account">
              <img src='https://api.iconify.design/mdi/account-circle.svg?color=whitesmoke' alt='account'></img>
              <h3>Account</h3>
              <img src='https://api.iconify.design/mdi/menu-down.svg?color=whitesmoke' alt='arrow'></img>
            </div>
            {accountIsOpen && <div className="header-account-li">
              <Link to={'/login'}>
                <button>SIGN IN</button>
              </Link>
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