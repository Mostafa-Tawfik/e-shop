import React from 'react'
import Categories from '../components/Categories'
import HomeSection from '../components/HomeSection'


function Home(props) {
  return (
    <div>
      <img src='../images/Free-Advertising-Ideas.jpg' alt='ad' className='ad-image'></img>

      <Categories {...props} filter='Top Deals'/>
      <Categories {...props} filter='Recommended for you'/>
      <HomeSection {...props} filter='Electronics'/>
      
    </div>
  )
}

export default Home