import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../logo.svg'
import SearchBar from './components/SearchBar'
import SideMenu from '../SideMenu'
import useProducts from '../../hooks/useProducts'
import { CartContext } from '../../context/Cart-context'
import { AuthContext } from '../../context/Auth-context'

function Header() {

  const {cart} = useContext(CartContext)
  const {signOut, userName} = useContext(AuthContext)

  // fetch products
  const {data: products} = useProducts()
  
  // map over products and return only unique values
  const categories = products && [...new Set(products.filter(p => p.category !== 'Sample category').map(p => p.category))]

  
  // handle sub nav bar
  // detect hover on cat on the main nav
  const [detectCat, setDetectCat] = useState('')
  
  // map over detected category and return only unique values of sub cat
  const subCategories = products && [...new Set(products.filter(p => p.category === detectCat).map(p => p.subCategory).filter(p => p !== undefined))]


  // a state to controll account drop down menu
  const [accountIsOpen, setAccountIsOpen] = React.useState(false)

  function openAccount() {
    setAccountIsOpen(prev => !prev)
  }


  const userAccount = (
    <div onClick={openAccount}className="header-account-holder">
      <div className="header-account">

        <img src='https://api.iconify.design/mdi/account-circle.svg?color=whitesmoke' alt='account'></img>

        <div className='header-account-account'>
          {/* if signed in show a user welcome */}
          {userName && <p>Hi {userName}!</p>}
          <h3>Account</h3>
        </div>

        <img src='https://api.iconify.design/mdi/menu-down.svg?color=whitesmoke' alt='arrow'></img>
      </div>
      {accountIsOpen && <div className="header-account-li" tabIndex='true' onBlur={openAccount}>

        {userName ?
        // if signed in
        <>
        <button onBlur={openAccount} onClick={()=>signOut()}>Sign Out</button>

        <hr></hr>

        <Link to={'/user/orders'}>
          <h5>My Orders</h5> 
        </Link>

        <Link to={'/user'}>
          <h5>Update info</h5> 
        </Link>

        <Link to={'/support'}>
          <h5>Need help!</h5> 
        </Link>
        </>
        :
        // if signed out
        <Link to={'/login'}>
          <button onBlur={openAccount}>Sign In</button>
        </Link>
        }

      </div>}
    </div>
  )


  const cartSection = (
    <Link to={'/cart'}>
      <div className='header-cart'>
        <img src='https://api.iconify.design/clarity/shopping-cart-solid-badged.svg?color=whitesmoke' className="cart-logo" alt="cart"/>
        <div className='cart-counter'>{cart.length}</div>
      </div>
    </Link>
  )

  return (
    <div>
      <div className="main-header">
        <div className='top-pane'>
          <div className='top-pane_info'>
            <p>Fast & Free Delivery</p>
            <p>Shop though a wide range of products</p>
            <p>Free Returns</p>
          </div>
        </div>

        <div className='bottom-pane'>
          <div className='bottom-pane_info'>

            {categories && <SideMenu content={categories}/>}

            <Link to={'/'}>
              <div className="App-title">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>E-Shop</h1>
              </div>
            </Link>

            <SearchBar />
            
            {userAccount}

            {cartSection}        

          </div>
        </div>
        
        <nav className="navbar">
          {categories && categories.map((i,index) => {
            return (
              <Link to={`/${i}`} key={index} onMouseEnter={()=>setDetectCat(i)}>
                <h4 className="navbar-item">{i}</h4>
              </Link>
            )
          })}
        </nav>

        <nav className="subNavbar">
          {subCategories && subCategories.map((i,index) => {
            return (
              <Link to={`/${i}`} key={index}>
                <h4 className="navbar-item">{i}</h4>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mobile-header">
        <div className='top-pane'>
          
          {userAccount}
        </div>

        <div className='mid-pane'>
          <Link to={'/'}>
            <div className="App-title">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1>E-Shop</h1>
            </div>
          </Link>
        </div>

        <div className='bottom-pane'>
          {categories && <SideMenu content={categories}/>}          
          <SearchBar />
          <Link to={'/cart'}>
            <div className='header-cart'>
              <img src='https://api.iconify.design/clarity/shopping-cart-solid-badged.svg?color=%23073c81' className="cart-logo" alt="cart"/>
              <div className='cart-counter'>{cart.length}</div>
            </div>
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Header