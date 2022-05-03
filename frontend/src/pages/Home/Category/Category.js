import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import ProductCard from '../../../components/ProductCard'
import Ratings from 'react-ratings-declarative'
import useProducts from '../../../hooks/useProducts'

function Category(props) {

  const params = useParams()

  // store all products
  const {data: products} = useProducts()

  const categories = products && [...new Set(products.map(p => p.category))]

  const [rating, setRating] = useState('')
  console.log(rating);

  let filterBy = products && products.filter(
    p=> 
    (p.category === params.name && p.rating >= rating) || 
    (p.subCategory === params.name && p.rating >= rating) || 
    (p.brand === params.name && p.rating >= rating) || 
    (p.rating >= params.name && p.rating >= rating)
  )


  // map over categories and return only unique values
  const subCatWithinCat = products && [...new Set(filterBy.map(p => p.subCategory).filter(c => c !== undefined))]

  // map over brands and return only unique values
  const brandWithinCat = products && [...new Set(filterBy.map(p => p.brand).filter(c => c !== undefined))]


  // console.log(filterBy)
  
  
  return (
    products &&
    <main className='category'>

      <aside className='category-menu-holder'>

        <div className='category-menu dep'>
          <h4>Department</h4>          
          <ul>
          {categories.map((Cat, index) => (
            <li key={index}>
              <Link to={`/${Cat}`}>
              {Cat}
              </Link>
            </li>                  
              ))}
          </ul>
        </div>

        <div className='category-menu dep'>
          <h4>Sub Categories</h4>          
          <ul>
          {subCatWithinCat.map((subCat, index) => (
            <li key={index}>
              <Link to={`/${subCat}`}>
              {subCat}
              </Link>
            </li>                  
              ))}
          </ul>
        </div>

        <div className='category-menu brand'>
          <h4>Brands</h4>
          <ul>
          {brandWithinCat.map((brand, index) => (
            <li key={index}>
              <Link to={`/${brand}`}>
              {brand}
              </Link>
            </li>                  
              ))}
          </ul>
        </div>

        <div className='category-menu review'>
          <h4>Average Reviews</h4>
          <ul>

            <li onClick={()=>setRating(4)}>
                <Ratings
                  rating={4}
                  widgetDimensions="20px"
                  widgetSpacings="0px"
                  widgetRatedColors="gold"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
            </li>

            <li onClick={()=>setRating(3)}>
                <Ratings
                  rating={3}
                  widgetDimensions="20px"
                  widgetSpacings="0px"
                  widgetRatedColors="gold"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
            </li>

            <li onClick={()=>setRating(2)}>
                <Ratings
                  rating={2}
                  widgetDimensions="20px"
                  widgetSpacings="0px"
                  widgetRatedColors="gold"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>                
            </li>   

            <li onClick={()=>setRating(1)}>
                <Ratings
                  rating={1}
                  widgetDimensions="20px"
                  widgetSpacings="0px"
                  widgetRatedColors="gold"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
            </li>         

            <li onClick={()=>setRating(0)}>
                <Ratings
                  rating={0}
                  widgetDimensions="20px"
                  widgetSpacings="0px"
                  widgetRatedColors="gold"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
            </li>                  
          </ul>
        </div>

      </aside>

      <section>

        <h3>{isNaN(params.name) ? params.name : `Average rating more than ${params.name}`}</h3>

        <div className='product-holder'>
          {filterBy.map(product => (
            <ProductCard content={product} {...props} key={product._id}/>
          ))}
        </div>
      </section>
      
    </main>

  )
}

export default Category