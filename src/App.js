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
  
  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setCart(items);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  function addToCart(items) {
    setCart([...cart, items])
  }

  function removeFromCart(id) {
    setCart([...cart.filter(item => item.id !== id)])
    if(cart.length === 1) {
      setCart([])
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Header  cart={cart}/>
      </header>

      <main className="App-main">
      <Routes>
          <Route path='/' element={<Home addToCart={addToCart} cart={cart}/>}/>
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart}/>}/>
          <Route path='/login' element={<Login />}/>
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
