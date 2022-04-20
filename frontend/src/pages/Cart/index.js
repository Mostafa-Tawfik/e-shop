import React from 'react'
import { Link } from 'react-router-dom'
import OrderSummary from './components/OrderSummary'

function Cart(props) {
  // console.log(props)

  // set delivery dates
  let date = new Date()
  date.setDate(date.getDate() + 2);
  let dayName = date.toLocaleString('en-us', {weekday: 'long'})
  let day = ("0" + (date.getDate())).slice(-2)
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let year = date.getFullYear()
  
  return (
    <div className='cart'>
      
      {props.cart.length > 0 ? 
      
      // if the cart is filled
      <div className='cart-holder'>
        <div className='cart-filled'>
          {props.cart.map(c => {
            return (
              
              // if the cart is filled
              <div key={c.id || c._id} className='cart-filled-items'>

                <Link to={`/product/${c.id}`}>
                  <img src={c.image} alt='product'></img>
                </Link>

                <div className='cart-filled-items-info'>

                  <Link to={`/product/${c.id}`}>
                    <h3>{c.title || c.name}</h3>
                  </Link>

                  
                  <div>Delivery by 
                    <p className='cart-delivery'>{dayName} {day}/{month}/{year}
                    </p>
                  </div>
  
                  {/* if there is a discount show it, if not show normal price */}
                  {c.discountprice ?
                  <p>${c.discountprice}</p> :
                  <p>${c.price}</p> }
  
                </div>

                <button onClick={()=> props.removeFromCart(c.id)}>
                  <img className='cart-delete' src='https://api.iconify.design/fluent/delete-16-filled.svg?color=%23fc2e20' alt='delete item'></img>
                </button>
                
              </div>
            )
          })}
        </div>

        <OrderSummary {...props}/>

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

    </div>
  )
}

export default Cart