import {React} from 'react'
import {Routes, Route} from 'react-router-dom'

import Footer from '../../layout/Footer';
import Header from '../../layout/Header/Header';

import Homepage from './components/Homepage';
import Product from './components/Product';
import Search from './components/Search';

import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import UserOrders from './user/UserOrders';
import UserOrderID from './user/UserOrderID';
import UserInfo from './user/UserInfo';
import ReviewOrder from './user/ReviewOrder';
import Support from './user/Support';
import Category from './Category/Category';
import Register from '../Register';
import Login from '../Login';

function Home(props) {

  return (
    <>
    
      <header className='App-header'>
        <Header />
      </header>

      <main className='App-main'>
        <Routes>

          <Route path='/register' element={<Register />}/>
            
          <Route path='/login' element={<Login adminLogged={props.adminLogged}/> }/>
        
          <Route path='/' element={<Homepage />}/>

          <Route path='/:name' element={<Category />}/>

          <Route path='/user/' element={<UserInfo />}/>

          <Route path='/user/orders' element={<UserOrders />}/>

          <Route path='/user/orders/:id' element={<UserOrderID />}/>

          <Route path='/user/review/:id' element={<ReviewOrder />}/>

          <Route path='/product/:id' element={<Product />}/>

          <Route path='/search/:name' element={<Search />}/>

          <Route path='/cart' element={<Cart />}/>

          <Route path='/checkout' element={<Checkout />}/>

          <Route path='/support' element={<Support />}/>
            
        </Routes>
      </main>
      
      <footer className='App-footer'>
        <Footer />
      </footer>
    
    </>
  )
}

export default Home