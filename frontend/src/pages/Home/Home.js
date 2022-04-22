import {React, useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'

import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

import Homepage from './components/Homepage';
import Product from './components/Product';
import Search from './components/Search';

import Cart from '../../pages/Cart/Cart';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Checkout from '../../pages/Checkout/Checkout';

function Home(props) {

  ///-- handle cart --///
  const [cart, setCart] = useState([])
  // console.log('cart', cart)

  // setup local storage for cart
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setCart(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // add to cart function
  function addToCart(item) {
    setCart([...cart, item])
  }


  // remove from cart function
  function removeFromCart(id) {
    setCart([...cart.filter(item => item._id !== id)])

    if(cart.length === 1) {
      setCart([])
    }
  }


  // handle qty change
  function setQty(qty, id) {
    setCart(prev => (
      // map over order items
      prev.map(
        //  if got matched
        p => p._id === id ?
        // update qty
        {...p, qty: qty}
        :
        // if not match return defualt
        p
        )
    ))
  }
  ///--- end ---///


  ///-- handle orders --///
  const [order, setOrder] = useState('')
  console.log('order', order)

  // generate orderItems
  function generateOrder() {
    setOrder(({
      'orderItems': cart.map(item => ({
        name: item.name,
        price: item.price * ((100 - item.discount)/100),
        product: item._id,
        image: item.image,
        qty: item.qty ? item.qty : 1
      }))
    }))
  }

  // setup local storage for Orders
  useEffect(() => {
    const userOrder = JSON.parse(localStorage.getItem('order'));
    if (userOrder) {
      setOrder(userOrder);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order));
  }, [order]);
  // ///--- end ---///


  return (
    <>
      <header className="App-header">
        <Header cart={cart} userLoggedIn={props.userLoggedIn} signOut={props.signOut}/>
      </header>

      <main className="App-main">
      <Routes>
          <Route path='/' element={
          <Homepage 
          addToCart={addToCart} 
          cart={cart}
          />}/>
          
          <Route path='/cart' element={
          <Cart 
          cart={cart} 
          setQty={setQty} 
          generateOrder={generateOrder} 
          removeFromCart={removeFromCart}
          />}/>

          <Route path='/login' element={
          <Login 
          userlogged={props.userlogged} 
          isAdmin={props.userLoggedIn.isAdmin}
          />}/>

          <Route path='/register' element={<Register />}/>

          <Route path='/product/:id' element={
          <Product 
          cart={cart} 
          addToCart={addToCart}
          />}/>

          <Route path='/search/:name' element={
          <Search 
          cart={cart} 
          addToCart={addToCart}
          />}/>

          <Route path='/checkout' element={<Checkout cart={cart} />}/>
          
      </Routes>
      </main>

      <footer className="App-footer">
        <Footer />
      </footer>
    </>
  )
}

export default Home