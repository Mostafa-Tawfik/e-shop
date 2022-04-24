import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import OrderSummary from './components/OrderSummary'
import Select from 'react-dropdown-select'

function Cart(props) {

   // auto start top page
   useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // set delivery dates
  let date = new Date()
  date.setDate(date.getDate() + 2);
  let dayName = date.toLocaleString('en-us', {weekday: 'long'})
  let day = ("0" + (date.getDate())).slice(-2)
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let year = date.getFullYear()

  const options = [
    { value: 1, label: 'Qty: 1' },
    { value: 2, label: 'Qty: 2' },
    { value: 3, label: 'Qty: 3' },
    { value: 4, label: 'Qty: 4' },
    { value: 5, label: 'Qty: 5' },
    { value: 6, label: 'Qty: 6' },
  ]

  // function options(item) {
  //   for (let i = 0; i < item.countInStock; i++) {
  //     return { value: i, label: `Qty: ${i}` }
  //   }
  // }
  
  return (
    <div className='cart'>
      
      {props.cart.length > 0 ? 
      
      // if the cart is filled
      <div className='cart-holder'>
        <div className='cart-filled'>
          {props.cart.map(c => {
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
  

  
                  <div className='dropdown'>
                    <Select
                      // if qty is not defined retun 1 if not display value
                      placeholder={`Qty: ${c.qty ? c.qty : 1}`}
                      searchable= {false}
                      options={options}
                      onChange={values => props.setQty(values[0].value, c._id)}
                    />
                  </div>

                </div>

                <div className='cart-filled-items-info-right'>
                  {c.discount ?
                    // if there is a discount show it, if not show normal price
                    <p>${c.price.toFixed() * ((100 - c.discount)/100)}</p> :
                    <p>${c.price.toFixed()}</p>}

                  <p>{c.discount > 0 && `$${c.price.toFixed()}`}</p>

                  <button onClick={()=> props.removeFromCart(c._id)}>
                    <img className='cart-delete' src='https://api.iconify.design/fluent/delete-16-filled.svg?color=%23fc2e20' alt='delete item'></img>
                  </button>
                </div>



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