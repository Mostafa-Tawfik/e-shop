import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import popAlert from '../components/popAlert'

function Product(props) {

  const [product, setProduct] = React.useState('')
  console.log(product)

  const params = useParams()

  React.useEffect(()=> {
    axios.get(`/api/products/${params.id}`)
    .then(res => setProduct(res.data))
  },[params.id])

  return (
    <div className='product'>
      <div className='product-holder'>
        <img src={product.image} alt='product'></img>
        <div className='product-info'>
          <p>{product.category}</p>
          <h2>{product.name}</h2>
          <p>Brand: {product.brand}</p>
          {/* <p>Colors: {product.colors}</p> */}
          
          <div>
            {product.discount > 0 ? 
            // if price have a discount
            <div className='product-price-holder'>
              <h5 className='product-price'>${product.price.toFixed() * ((100 - product.discount)/100)}</h5>
              <div className='product-price-savings'>
                <h5>Save ${product.price.toFixed() * product.discount/100}</h5>
                <p>All prices include VAT.</p>
              </div>
            </div> : 
            // // if price dosen't have a discount
            <div className='product-price-holder'>
              <h5 className='product-price'>
                ${product.price}
              </h5>
            </div>}
          </div>

          {product.description && <p className='product-info-desc'>{product.description}</p>}

          <hr></hr>


          {/* onclick add to cart */}
          <button onClick={()=> {
            // check if the item is already in the cart
              props.cart.length > 0 &&
              props.cart.map(c => c.id).includes(product.id) ?
              popAlert('info', 'Product already in your cart') :
              props.addToCart(product)
            }}>
              {/* if product is on the cart show "added" */}
              {props.cart && props.cart.map(c => c.id).includes(product.id) ? 
              <p>Added</p> :
              <p>Add to cart</p>}
              
            </button>

          {product.discount > 0 && <h2 className='product-discount'>{product.discount}%</h2>}
        </div>
      </div>
    </div>
  )
}

export default Product