import React, { Fragment } from 'react'
import AppData from '../AppData'

function Categories(props) {

  const [added, setAdded] = React.useState('')
  // console.log(added)

  return (
    <div className='cat-holder'>
      {AppData.categories.map(d => {
        return (
          <Fragment key={d.id}>
            <h4>{d.title}</h4>

            <div className='product-holder'>
            {d.items.map(i => {
              return (
                  <div key={i.id} className='product-card'>
                    <div className='discount'>
                      {i.discount && <h5>{i.discount}% OFF</h5>}
                    </div>

                    <img src={i.image} alt='product' className='product-img'></img>

                    <div className='product-info'>
                      <h4 className='product-title'>{i.title}</h4>

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
                      <img src={`https://api.iconify.design/bi/${added.includes(i.id) ? 'cart-check-fill.svg?color=green':'cart-plus-fill.svg?color=%23073c81$'}`} alt='add-to-cart'></img>
                    </button>
                  </div>
              )
            })}
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default Categories