import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import Select from 'react-dropdown-select'

import ProductCard from '../components/ProductCard'
import Ratings from 'react-ratings-declarative'
import useProducts from '../../../hooks/useProducts'

function Category() {

  // auto start top page
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  // use react router hooks
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsQuery = Object.fromEntries([...searchParams])

  // store all products
  const {data: products} = useProducts()

  // extract unique categories
  const categories = products && [...new Set(products.map(p => p.category))]

  const [rating, setRating] = useState('')

  // filter by any of avaiable filters
  let filterBy = products && products.filter(p=> 
    (p.category === params.name && p.rating >= rating) || 
    (p.subCategory === params.name && p.rating >= rating) || 
    (p.brand === params.name && p.rating >= rating) || 
    (p.rating >= params.name && p.rating >= rating)
  )

  // map over categories and return only unique values
  const subCatWithinCat = products && [...new Set(filterBy.map(p => p.subCategory).filter(c => c !== undefined))]

  // map over brands and return only unique values
  const brandWithinCat = products && [...new Set(filterBy.map(p => p.brand).filter(c => c !== undefined))]

  // sort the products
  const sortedProducts = filterBy && filterBy.sort((productA, productB) => {
    if (paramsQuery.sort === 'price' && paramsQuery.order === 'desc') {
      return productB.price - productA.price
    } else if(paramsQuery.sort === 'price') {
      return productA.price - productB.price
    } else if (paramsQuery.sort === 'rating') {
      return productB.rating - productA.rating
    } else if (paramsQuery.sort === 'discount') {
      return productB.discount - productA.discount
    }
  })

    console.log(sortedProducts);
  
  
  // set controls for sort drop menu
  const sortMenu = [
    {value: ()=>setSearchParams({sort: 'discount'}), label: 'Discount'},
    {value: ()=>setSearchParams({sort: 'price', order: 'asc'}), label: 'Price: Low to High'},
    {value: ()=>setSearchParams({sort: 'price', order: 'desc'}), label: 'Price: High to Low'},
    {value: ()=>setSearchParams({sort: 'rating'}), label: 'Average Ratings'},
  ]
  
  // controll page motion
  const pageMotion= {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 0, transition: { duration: 0.5 } }
  }
  
  return (
    products &&
    <motion.main 
    initial='initial'
    animate='animate'
    exit='exit'
    variants={pageMotion}
    className='category'>

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

        <div>
          <Select
            placeholder='Sort by:'
            searchable= {false}
            options={sortMenu}
            onChange={(value)=>value[0].value()}
            className= 'category-sort-select'
          />
        </div>

        <div className='product-holder'>
          {sortedProducts.map(product => (
            <ProductCard content={product} key={product._id}/>
          ))}
        </div>
      </section>
      
    </motion.main>

  )
}

export default Category