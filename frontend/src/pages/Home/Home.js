import {React, useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'

import Footer from '../../layout/Footer';
import Header from '../../layout/Header/Header';

import Homepage from './components/Homepage';
import Product from './components/Product';
import Search from './components/Search';

import Cart from './Cart/Cart';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Checkout from './Checkout/Checkout';
import UserOrders from './user/UserOrders';
import UserOrderID from './user/UserOrderID';
import UserInfo from './user/UserInfo';
import ReviewOrder from './user/ReviewOrder';
import Support from './user/Support';
import Category from './Category/Category';

function Home(props) {

  ///-- handle cart --///
  const [cart, setCart] = useState('')
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

  // empty cart
  function emptyCart() {
    setCart([])
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
  // console.log('order', order)

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

  // generate shippingAddress
  function setShippingAddress(form) {
    setOrder(prev => ({
      'orderItems': [
        ...prev.orderItems
      ],
      'shippingAddress': {
        'address': form.address,
        'city': form.city,
        'postalCode': form.postalCode,
        'country': form.country,
      }
    }))
  }


  // generate paymentMethod
  function setPaymentMethod(form) {
    setOrder(prev => ({
      'orderItems': [
        ...prev.orderItems
      ],
      'shippingAddress': {
        ...prev.shippingAddress
      },
      'paymentMethod': form.paymentMethod
    }))
  }

  // set delivery dates
  let date = new Date()
  date.setDate(date.getDate());

  // place the order
  function placeOrder() {
    setOrder(prev => ({
      'orderItems': [
        ...prev.orderItems
      ],
      'shippingAddress': prev.shippingAddress,
      'paymentMethod': prev.paymentMethod,
      'shippingPrice': 20,
      'totalPrice': prev.orderItems.map(i => i.price * i.qty).reduce((x, y) => x + y) + 20,
      'isPaid': false,
      'isDelivered': false,
      'paidAt': date
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
      <header className='App-header'>
        <Header 
          cart={cart} 
          userLoggedIn={props.userLoggedIn} 
          signOut={props.signOut}
          isAdmin={props.isAdmin}
        />
      </header>

      <main className='App-main'>
      <Routes>
        
          <Route path='/' element={
            <Homepage 
            addToCart={addToCart} 
            cart={cart}
            />
          }/>

          <Route path='/register' element={<Register />}/>
          
          <Route path='/login' element={
            <Login 
            userlogged={props.userlogged} 
            isAdmin={props.userLoggedIn.isAdmin}
            />
          }/>

          <Route path='/:name' element={
            <Category 
            />
          }/>

          <Route path='/user/' element={
            <UserInfo 
            />
          }/>

          <Route path='/user/orders' element={
            <UserOrders 
            isAdmin={props.userLoggedIn.isAdmin}
            />
          }/>

          <Route path='/user/orders/:id' element={
            <UserOrderID 
            />
          }/>

          <Route path='/user/review/:id' element={
            <ReviewOrder 
            />
          }/>

          <Route path='/product/:id' element={
            <Product 
            cart={cart} 
            addToCart={addToCart}
            />
          }/>

          <Route path='/search/:name' element={
            <Search 
            cart={cart} 
            addToCart={addToCart}
            />
          }/>

            <Route path='/cart' element={
              <Cart 
              cart={cart} 
              setQty={setQty} 
              generateOrder={generateOrder} 
              removeFromCart={removeFromCart}
              />
            }/>

          <Route path='/checkout' element={
            <Checkout 
            cart={cart} 
            setShippingAddress={setShippingAddress}
            setPaymentMethod={setPaymentMethod}
            placeOrder={placeOrder}
            order={order}
            emptyCart={emptyCart}
            userLoggedIn={props.userLoggedIn}
            />
          }/>

          <Route path='/support' element={
            <Support 
            />
          }/>
          
      </Routes>
      </main>

      <footer className='App-footer'>
        <Footer />
      </footer>
    </>
  )
}

export default Home