import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import ProductCard from '../../../components/ProductCard'
import Ratings from 'react-ratings-declarative'

function Category(props) {

  const params = useParams()

  // store all products
  const [products, setProducts] = React.useState([])
  
  // fetch all products
  useEffect(()=> {
    axios.get('/api/products?productNum=Infinity')
    .then(res => setProducts(res.data.products))
  },[])

  const filterByCategory = products.filter(p=> p.category === params.name || p.subCategory === params.name || p.brand === params.name || p.rating >= params.name)


  // map over categories and return only unique values
  const subCatWithinCat = [...new Set(filterByCategory.map(p => p.subCategory).filter(c => c !== undefined))]

  // map over brands and return only unique values
  const brandWithinCat = [...new Set(filterByCategory.map(p => p.brand).filter(c => c !== undefined))]


  console.log(filterByCategory)
  
  
  return (

    <main className='category'>

      <aside className='category-menu-holder'>

        <div className='category-menu dep'>
          <h4>Department</h4>          
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

            <li>
              <Link to={`/4`}>
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
              </Link>
            </li>

            <li>
              <Link to={`/3`}>
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
              </Link>                  
            </li>

            <li>
              <Link to={`/2`}>
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
              </Link>
            </li>   

            <li>
              <Link to={`/1`}>
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
              </Link>
            </li>                  
          </ul>
        </div>

      </aside>

      <section>

        <h3>{isNaN(params.name) ? params.name : `Average rating more than ${params.name}`}</h3>

        <div className='product-holder'>
          {filterByCategory.map(product => (
            <ProductCard content={product} {...props} key={product._id}/>
          ))}
        </div>
      </section>
      
    </main>

  )
}

export default Category