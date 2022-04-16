import './App.scss';
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Search from './pages/Search';

function App() {

  const [cart, setCart] = React.useState('')

  // setup local storage
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
  function addToCart(items) {
    setCart([...cart, items])
  }

  // remove from cart function
  function removeFromCart(id) {
    setCart([...cart.filter(item => item.id !== id)])
    if(cart.length === 1) {
      setCart([])
    }
  }

  // a state to control login
  const [userLoggedIn, setUserLoggedIn,] = React.useState('')
  console.log(userLoggedIn)

  // a login function with the logged user id
  function userlogged(user) {
    setUserLoggedIn(user)
  }

  // a login function with the logged user id
  function signOut() {
    setUserLoggedIn('')
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

  
  return (
    <div className="App">
      <header className="App-header">
        <Header cart={cart} userLoggedIn={userLoggedIn[0]} signOut={signOut}/>
      </header>

      <main className="App-main">
      <Routes>
          <Route path='/' element={<Home addToCart={addToCart} cart={cart}/>}/>
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart}/>}/>
          <Route path='/login' element={<Login userlogged={userlogged}/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/product/:id' element={<Product cart={cart} addToCart={addToCart}/>}/>
          <Route path='/search/:name' element={<Search cart={cart} addToCart={addToCart}/>}/>
      </Routes>
      </main>


      <footer className="App-footer">
        <Footer />
      </footer>
      
    </div>
  );
}

export default App;
