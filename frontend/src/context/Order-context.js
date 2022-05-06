import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../Helpers/localStorage";
import { CartContext } from "./Cart-context";

export const OrderContext = createContext({
  order: [],
  generateOrder: ()=>{},
  setShippingAddress: ()=>{},
  setPaymentMethod: ()=>{},
  placeOrder: ()=>{}
})

export function OrderProvider({children}) {

  const {cart} = useContext(CartContext)

  const [order, setOrder] = useState(()=>getLocalStorage('order', {}))
  console.log(order);

  useEffect(()=>setLocalStorage('order', order),[order])

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

  return <OrderContext.Provider value={{
    order: order,
    generateOrder: generateOrder,
    setShippingAddress: setShippingAddress,
    setPaymentMethod: setPaymentMethod,
    placeOrder: placeOrder
  }}>
    {children}
  </OrderContext.Provider>
}