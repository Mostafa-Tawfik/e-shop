import './App.scss';
import {Routes, Route, useLocation} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <main className="App-main">
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
      </Routes>
      </main>


      <footer className="App-footer">
        <Footer />
      </footer>
      
    </div>
  );
}

export default App;
