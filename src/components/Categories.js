import React from 'react'
import AppData from '../AppData'
import { Link } from 'react-router-dom'

function Categories(props) {

  const [added, setAdded] = React.useState('')
  // console.log(added)

  return (
    <div className='cat-holder'>
      <h4>{props.filter}</h4>
      <div className='product-holder'>
      {AppData.Products.filter(i=>i.subcategory === props.filter).map(i => {
        return (
          <div key={i.id} className='product-card'>
            <div className='discount'>
              {i.discount && <h5>{i.discount}% OFF</h5>}
            </div>

            <Link to={`/product/${i.id}`}>
              <img src={i.image} alt='product' className='product-img'></img>
            </Link>

            <div className='product-info'>

              <Link to={`/product/${i.id}`}>
                <h4 className='product-title'>{i.title}</h4>
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
              props.addToCart(i)
              setAdded([...added, i.id])
            }}>
              <img src={`https://api.iconify.design/bi/${added.includes(i.id) ? 'cart-check-fill.svg?color=green':'cart-plus-fill.svg?color=%23073c81'}`} alt='add-to-cart'></img>
            </button>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Categories