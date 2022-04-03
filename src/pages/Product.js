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

  const [added, setAdded] = React.useState('')

  return (
    <div className='product'>
      <div className='product-holder'>
        <img src={product[0].image} alt='product'></img>
        <div className='product-info'>
          <p>{product[0].category}</p>
          <h2>{product[0].title}</h2>
          <p>Brand: {product[0].brand}</p>
          <p>Colors: {product[0].colors}</p>
          
          {product[0].description && <p className='product-info-desc'>{product[0].description}</p>}

          <hr></hr>

          {product[0].discountprice ? <p>Price: ${product[0].discountprice}</p> : <p>Price: ${product[0].price}</p>}


          {/* onclick add to cart */}
          <button onClick={()=> {
              props.addToCart(product[0])
              setAdded([...added, product[0].id])
            }}>
              <img src={`https://api.iconify.design/bi/${added.includes(product[0].id) ? 'cart-check-fill.svg?color=green':'cart-plus-fill.svg?color=%23073c81'}`} alt='add-to-cart'></img>
            </button>

          {product[0].discount && <h2 className='product-discount'>{product[0].discount}%</h2>}
        </div>
      </div>
    </div>
  )
}

export default Product