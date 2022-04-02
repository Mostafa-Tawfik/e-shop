import React from 'react'
import Categories from '../components/Categories'


function Home(props) {
  return (
    <div>
      <img src='../images/Free-Advertising-Ideas.jpg' alt='ad' className='ad-image'></img>

      <Categories addToCart={props.addToCart}/>
      
    </div>
  )
}

export default Home