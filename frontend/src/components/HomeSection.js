import React from 'react'
import { Link } from 'react-router-dom'

function HomeSection(props) {

  const [products, setProducts] = React.useState([])
  console.log(products)

  React.useEffect(()=> {
    fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data.products))
  },[])

  return (
    <div className='cat-holder'>
      <h4>{props.filter}</h4>
      <div className='product-holder'>
      {products.filter(i=>i.category === props.filter).map(i => {
        return (
          <div key={i._id} className='product-card'>
            <div className='discount'>
              {i.discount && <img src='https://png2.cleanpng.com/sh/d5b9d75cd8a81f00a1af6b3e11d81b73/L0KzQYm3U8I4N6N0fZH0aYP2gLBuTgNidJZ4RdlqcnHqdX76gfxmNZVui9V4dX73g37ojvQuaZ1xhAlqbnPog376iP9xeJpzReVqbHWwg8XwgBtmel46edQEZUXkRom9WcFmPV85UakDM0azR4K8UsIyO2M4UaIANUG1PsH1h5==/kisspng-sales-garage-sale-discounts-and-allowances-shoppin-sale-sticker-5ab9e5a68691e5.4978360715221323905512.png' alt='sale'></img>}
            </div>

            <Link to={`/product/${i._id}`}>
              <img src={i.image} alt='product' className='product-img'></img>
            </Link>

            <div className='product-info'>

              <Link to={`/product/${i._id}`}>
                <h4 className='product-title'>{i.name}</h4>
              </Link>
              
              <p className='product-category'>{i.category}</p>

              {i.discountprice ? 
              <div className='product-price-com'>
                <h5 className='product-newprice'>${i.discountprice}</h5>
                <h5 className='product-oldprice'>${i.price}</h5>
              </div>
                : 
              <h5 className='product-price'>${i.price}</h5>}
            </div>
            
            {/* onclick add to cart */}
            <button onClick={()=> {
              props.cart.length > 0 &&
              props.cart.map(c => c._id).includes(i._id) ?
              alert("Product already in your cart") :
              props.addToCart(i)
            }}>
              <img src={`https://api.iconify.design/bi/${props.cart && props.cart.map(c => c._id).includes(i._id) ? 'cart-check-fill.svg?color=green':'cart-plus-fill.svg?color=%23073c81'}`} alt='add-to-cart'></img>
            </button>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default HomeSection