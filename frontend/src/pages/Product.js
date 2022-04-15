import React from 'react'
import AppData from '../AppData'
import { useParams } from 'react-router-dom'

function Product(props) {

  const [product, setProduct] = React.useState(AppData.Products)
  console.log(product)

  const params = useParams()

  React.useEffect(()=> {
    setProduct(AppData.Products.filter(i=>i.id === params.id*1))
  },[params.id])

  return (
    <div className='product'>
      <div className='product-holder'>
        <img src={product[0].image} alt='product'></img>
        <div className='product-info'>
          <p>{product[0].category}</p>
          <h2>{product[0].title}</h2>
          <p>Brand: {product[0].brand}</p>
          <p>Colors: {product[0].colors}</p>
          
          <div>
            {product[0].discountprice ? 
            // if price have a discount
            <div className='product-price-holder'>
              <h5 className='product-price'>${product[0].discountprice}</h5>
              <div className='product-price-savings'>
                <h5>Save {product[0].discount}%</h5>
                <p>All prices include VAT.</p>
              </div>
            </div> : 
            // // if price dosen't have a discount
            <div className='product-price-holder'>
              <h5 className='product-price'>
                ${product[0].price}
              </h5>
            </div>}
          </div>

          {product[0].description && <p className='product-info-desc'>{product[0].description}</p>}

          <hr></hr>


          {/* onclick add to cart */}
          <button onClick={()=> {
            // check if the item is already in the cart
              props.cart.length > 0 &&
              props.cart.map(c => c.id).includes(product[0].id) ?
              alert("Product already in your cart") :
              props.addToCart(product[0])
            }}>
              {/* if product is on the cart show "added" */}
              {props.cart && props.cart.map(c => c.id).includes(product[0].id) ? 
              <p>Added</p> :
              <p>Add to cart</p>}
              
            </button>

          {product[0].discount && <h2 className='product-discount'>{product[0].discount}%</h2>}
        </div>
      </div>
    </div>
  )
}

export default Product