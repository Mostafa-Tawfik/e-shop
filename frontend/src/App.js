import './App.scss';
import React, { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Footer from './layout/Footer';
import Header from './layout/Header';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard/index'
import Checkout from './pages/Checkout/Checkout'

function App() {

  ///-- handle cart --///
  const [cart, setCart] = React.useState([])
  console.log(cart)

  // setup local storage for cart
  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setCart(items);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // add to cart function
  function addToCart(item) {
    setCart([...cart, item])
    setOrder(prev => ({
      'orderItems': [...prev.orderItems,
        {
          name: item.name,
          price: item.price,
          product: item._id,
          image: item.image
        },
      ]
    }))
  }


  // remove from cart function
  function removeFromCart(id) {
    setCart([...cart.filter(item => item._id !== id)])

    setOrder({'orderItems': order.orderItems.map(i => i).filter(p => p.product !== id)})

    if(cart.length === 1) {
      setCart([])
    }
  }
  ///--- end ---///


  ///-- handle user login details --///
  const [userLoggedIn, setUserLoggedIn,] = React.useState('')

  // a login function with the logged user id
  function userlogged(user) {
    setUserLoggedIn(user)
    setjwt(user.token)
  }

  // a logout function
  function signOut() {
    setUserLoggedIn('')
    localStorage.removeItem(userLoggedIn)
  }

  // setup local storage for signed in user
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLoggedIn'));
    if (user) {
      setUserLoggedIn(user);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);
  ///--- end ---///


  ///-- handle user token --///
  const [jwt, setjwt] = useState('')

  // store token in localStorage
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('jwt'));
    if (user) {
      setjwt(user);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }, [jwt]);
  ///--- end ---///


  ///-- handle orders --///
  const [order, setOrder] = useState({
    'orderItems': [
      {
        'name': '',
        'qty': '',
        'image': '',
        'price': '',
        'product': ''
      }
    ]
  })

  // function addToOrder(i) {
  //   setOrder(prev => ({
  //     orderItems: [
  //       ...prev,
  //       {'name': i.name}
  //     ]
  //   }))
  // }

  console.log(order)
  

  const homePage = (
    <div className="App">
      
      <header className="App-header">
        <Header cart={cart} userLoggedIn={userLoggedIn} signOut={signOut}/>
      </header>

      <main className="App-main">
      <Routes>
          <Route path='/' element={<Home addToCart={addToCart} cart={cart}/>}/>
          
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart}/>}/>

          <Route path='/login' element={<Login userlogged={userlogged} isAdmin={userLoggedIn.isAdmin}/>}/>

          <Route path='/register' element={<Register />}/>

          <Route path='/product/:id' element={<Product cart={cart} addToCart={addToCart}/>}/>

          <Route path='/search/:name' element={<Search cart={cart} addToCart={addToCart}/>}/>

          <Route path='/checkout' element={<Checkout cart={cart} />}/>

          
      </Routes>
      </main>

      <footer className="App-footer">
        <Footer />
      </footer>
      
    </div>
  )

  return (
    <>
      {userLoggedIn.isAdmin ? 
      <Dashboard signOut={signOut}/> : 
      homePage
      }
    </>
  )
}

export default App;
