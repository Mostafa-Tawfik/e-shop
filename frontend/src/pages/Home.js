import React from 'react'
import HomeSection from '../components/HomeSection'


function Home(props) {
  return (
    <div>
      <img src='../images/Free-Advertising-Ideas.jpg' alt='ad' className='ad-image'></img>

      <HomeSection {...props} filter='Electronics'/>
      <HomeSection {...props} filter='Shoes'/>
      
    </div>
  )
}

export default Home