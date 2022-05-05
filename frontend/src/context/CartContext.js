import React, { createContext, useEffect, useState } from 'react'
import {getLocalStorage, setLocalStorage} from '../Helpers/localStorage';
import popAlert from '../Helpers/popAlert';

export const CartContext = createContext({
  cart: [],
  addToCart: (item)=>{},
  removeFromCart: (id)=>{},
  setQty: (qty, id)=>{},
  emptyCart: ()=>{},
});

export function CartProvider({children}) {

  const [cart, setCart] = useState(()=> getLocalStorage('cart',[]))

  useEffect(() => {
    setLocalStorage('cart', cart)
  }, [cart]);

  function addToCart(item) {
    if(item.countInStock >= 1) {
      setCart([...cart, item])
    } else {
      popAlert('Sorry product out of stock', 'warning')
    }
  }

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

  // empty cart
  function emptyCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart: cart, 
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      setQty: setQty,
      emptyCart: emptyCart
    }}>
      <>{children}</>
    </CartContext.Provider>
  );
}