import './App.scss';
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {

  const [cart, setCart] = React.useState('')

  // console.log(cart)

  function addToCart(items) {
    setCart([...cart, items])
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Header  cart={cart}/>
      </header>

      <main className="App-main">
      <Routes>
          <Route path='/' element={<Home addToCart={addToCart}/>}/>
          <Route path='/cart' element={<Cart cart={cart}/>}/>
      </Routes>
      </main>


      <footer className="App-footer">
        <Footer />
      </footer>
      
    </div>
  );
}

export default App;
