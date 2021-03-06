import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import OrderSummary from './OrderSummary'
import popAlert from '../../../Helpers/popAlert'
import { CartContext } from '../../../context/Cart-context';

function Cart() {
 
  const {cart, setQty, removeFromCart} = useContext(CartContext)

  // auto start top page
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  // set delivery dates
  let date = new Date()
  date.setDate(date.getDate() + 2);
  let dayName = date.toLocaleString('en-us', {weekday: 'long'})
  let day = ("0" + (date.getDate())).slice(-2)
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let year = date.getFullYear()


  // handle qty increase
  function qtyInc(id, qty, maxQty) {
    const inc = parseInt(qty ? qty : 1) + 1
    if(inc <= maxQty) {
      setQty(inc, id)
    } else {
      popAlert('Maximum limit reached', 'info')
    }
  }

  // handle qty decrease
  function qtyDec(id, qty) {
    const dec = parseInt(qty) - 1
    if(dec > 0) {
      setQty(dec, id)
    }
  }

  // handle qty manual inputs
  function handleQtyInput(e, id, maxQty) {
    if (e.target.value > 0 && e.target.value <= maxQty) {
      setQty(e.target.value, id)
    }
  }

  // handles what to diplay on qty counter
  function handleQtyCounterValue(id, qty) {
    if (qty) {
      return cart.filter(p=>p._id === id).map(p=>p.qty)
    }
    else {
      return 1
    }
  }


  const pageMotion= {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, transition: { duration: 0.5 } }
  }

  
  return (
    <motion.div 
    initial='initial'
    animate='animate'
    exit='exit'
    variants={pageMotion} 
    className='cart'>
      
      {cart.length > 0 ? 
      
      // if the cart is filled
      <div className='cart-holder'>
        <div className='cart-filled'>
          {cart.map(c => {
            return (
              
              // if the cart is filled
              <div key={c._id} className='cart-filled-items'>

                <Link to={`/product/${c._id}`}>
                  <img src={c.image} alt='product'></img>
                </Link>

                <div className='cart-filled-items-info'>

                  <Link to={`/product/${c._id}`}>
                    <h3>{c.name}</h3>
                  </Link>

                  
                  <div>
                    <p>Delivery by </p>
                    <p className='cart-delivery'>{dayName} {day}/{month}/{year}
                    </p>
                  </div>


                  <div className='cart-qty-counter'>
                    
                    <img src='https://api.iconify.design/akar-icons/circle-minus-fill.svg?color=%23073c81' alt='plus'
                    onClick={()=>qtyDec(c._id, c.qty, c.countInStock)}></img>

                    <input 
                      type='text'
                      name='qtyCount'
                      value={handleQtyCounterValue(c._id, c.qty)}
                      onChange={(e)=>handleQtyInput(e, c._id, c.countInStock)}
                      className='cart-qty-count'>
                    </input>

                    <img src='https://api.iconify.design/clarity/plus-circle-solid.svg?color=%23073c81' alt='plus'
                    onClick={()=>qtyInc(c._id, c.qty, c.countInStock)}></img>

                  </div>

  
                </div>

                <div className='cart-filled-items-info-right'>
                  <p>{c.discount > 0 && `$${c.price.toFixed()}`}</p>
                  {c.discount ?
                    // if there is a discount show it, if not show normal price
                    <p>${Number(c.price * ((100 - c.discount)/100)).toFixed()}</p> :
                    <p>${Number(c.price).toFixed()}</p>}


                  <button onClick={()=> removeFromCart(c._id)}>
                    <img className='cart-delete' src='https://api.iconify.design/fluent/delete-16-filled.svg?color=%23fc2e20' alt='delete item'></img>
                  </button>
                </div>



              </div>
            )
          })}
        </div>

        <OrderSummary />

      </div>

      :

      // if the cart is empty
      <div className='cart-empty'>
        <img src='https://api.iconify.design/emojione/shopping-cart.svg' className="cart-logo" alt="cart"/>

        <h4>Your cart is empty!</h4>
        
        <p>Browse our categories and discover our best deals!</p>

        <Link to={'/'}>
          <button className='home-btn'>continue shopping</button>
        </Link>
      </div>
      
      }

    </motion.div>
  )
}

export default Cart